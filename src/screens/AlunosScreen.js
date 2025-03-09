import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ref, push, onValue, remove } from "firebase/database";
import { database } from "../firebaseConfig";
import * as FileSystem from "expo-file-system";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import * as Sharing from "expo-sharing";
import FormAlunos from "../fileWord/FormAlunos";
import ListaAlunos from "../fileWord/ListaAlunos";
import PrintOptions from "../fileWord/PrintOptions";
import { AntDesign } from "@expo/vector-icons";

const TEMPLATE_URL =
  "https://docs.google.com/document/d/1jA2lFQ8IJiVwJP_uwZTtU92vAd2OdQrSiZvagIWhfuo/export?format=docx";

const downloadTemplate = async () => {
  try {
    const localUri =
      FileSystem.documentDirectory + "Transporte_Universitario_Template.docx";
    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(localUri, { idempotent: true });
      console.log("Versão antiga do template excluída.");
    }
    const downloadRes = await FileSystem.downloadAsync(TEMPLATE_URL, localUri);
    console.log("Template baixado para:", downloadRes.uri);
    return downloadRes.uri;
  } catch (error) {
    console.error("Erro ao baixar template:", error);
    throw error;
  }
};

const limparEspaco = async () => {
  try {
    const arquivos = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    const MAX_ARQUIVOS = 5;
    if (arquivos.length > MAX_ARQUIVOS) {
      arquivos.sort();
      const arquivosAntigos = arquivos.slice(0, arquivos.length - MAX_ARQUIVOS);
      for (const arquivo of arquivosAntigos) {
        await FileSystem.deleteAsync(FileSystem.documentDirectory + arquivo);
        console.log(`Arquivo excluído: ${arquivo}`);
      }
    }
  } catch (error) {
    console.error("Erro ao excluir arquivos antigos:", error);
  }
};

const gerarDoc = async (lista, tipo) => {
  try {
    const templatePath =
      FileSystem.documentDirectory + "Transporte_Universitario_Template.docx";
    await downloadTemplate();
    const docTemplateBase64 = await FileSystem.readAsStringAsync(templatePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const zip = new PizZip(docTemplateBase64, { base64: true });
    const doc = new Docxtemplater(zip, {
      delimiters: { start: "<%", end: "%>" },
    });
    const dataObj = {};
    lista.forEach((nome, index) => {
      dataObj[`name${index + 1}`] = nome;
    });
    for (let i = 1; i <= 27; i++) {
      if (!dataObj[`name${i}`]) {
        dataObj[`name${i}`] = "";
      }
    }
    const dataAtual = new Date();
    dataObj["day"] = dataAtual.getDate();
    dataObj["month"] = dataAtual.getMonth() + 1;
    dataObj["year"] = dataAtual.getFullYear();
    dataObj["opcao"] = tipo;
    doc.render(dataObj);
    const generatedBase64 = doc.getZip().generate({ type: "base64" });
    const novoArquivoUri =
      FileSystem.documentDirectory + `Transporte_Universitario_${tipo}.docx`;
    await FileSystem.writeAsStringAsync(novoArquivoUri, generatedBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(
      `Documento ${tipo} gerado com sucesso! Caminho: ${novoArquivoUri}`
    );
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(novoArquivoUri);
    } else {
      alert(
        "Compartilhamento não está disponível nesta plataforma. O arquivo foi salvo em: " +
          novoArquivoUri
      );
    }
    await limparEspaco();
  } catch (error) {
    console.error("Erro ao gerar o documento:", error);
    alert("Erro ao gerar o documento. Veja o console para detalhes.");
  }
};

function AlunosScreen() {
  const [name, setName] = useState("");
  const [seletLocation, setSeletLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [selectOpcao, setSelectOpcao] = useState("Subir");
  const [listaSubir, setListaSubir] = useState([]);
  const [listaDescer, setListaDescer] = useState([]);
  const [tipoLista, setTipoLista] = useState("Ambas");
  const [showForm, setShowForm] = useState(true);
  const [showPrintOptions, setShowPrintOptions] = useState(false);

  useEffect(() => {
    const alunosRef = ref(database, "alunos");
    onValue(alunosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let subirList = [];
        let descerList = [];
        Object.values(data).forEach((item) => {
          if (item.subir || item.descerSubir) subirList.push(item.name);
          if (item.descer || item.descerSubir) descerList.push(item.name);
        });
        setListaSubir(subirList);
        setListaDescer(descerList);
      } else {
        setListaSubir([]);
        setListaDescer([]);
      }
    });
  }, []);

  const handleEnviar = async () => {
    if (!name.trim() || listaSubir.length >= 27) {
      alert("Máximo de 27 pessoas ou preencha todos os campos!");
      return;
    }
    const local = seletLocation === "other" ? customLocation : seletLocation;
    try {
      await push(ref(database, "alunos"), {
        name,
        local,
        subir: selectOpcao === "Subir",
        descer: selectOpcao === "Descer",
        descerSubir: selectOpcao === "DescerSubir",
      });
      setName("");
      setSeletLocation("");
      setCustomLocation("");
      setSelectOpcao("Subir");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleDelete = (nameToDelete) => {
    const alunosRef = ref(database, "alunos");
    onValue(alunosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.keys(data).forEach((key) => {
          if (data[key].name === nameToDelete) {
            remove(ref(database, `alunos/${key}`));
          }
        });
      }
    });
  };

  const imprimirLista = async () => {
    if (tipoLista === "Ambas") {
      await gerarDoc(listaSubir, "Subir");
      await gerarDoc(listaDescer, "Descer");
    } else if (tipoLista === "Subir") {
      await gerarDoc(listaSubir, "Subir");
    } else if (tipoLista === "Descer") {
      await gerarDoc(listaDescer, "Descer");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.toggleFormButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.toggleFormButtonText}>
            {showForm ? "Ocultar formulário" : "Mostrar formulário"}
          </Text>
        </TouchableOpacity>
        {showForm && (
          <FormAlunos
            name={name}
            setName={setName}
            seletLocation={seletLocation}
            setSeletLocation={setSeletLocation}
            customLocation={customLocation}
            setCustomLocation={setCustomLocation}
            selectOpcao={selectOpcao}
            setSelectOpcao={setSelectOpcao}
            handleEnviar={handleEnviar}
          />
        )}
        <View style={styles.listContainer}>
          <ListaAlunos
            titulo="Lista Subir"
            lista={listaSubir}
            onDelete={handleDelete}
          />
          <ListaAlunos
            titulo="Lista Descer"
            lista={listaDescer}
            onDelete={handleDelete}
          />
        </View>
      </ScrollView>
      <View style={styles.footerPlaceholder} />
      <TouchableOpacity
        style={styles.printToggle}
        onPress={() => setShowPrintOptions(!showPrintOptions)}
      >
        <AntDesign
          name={showPrintOptions ? "up" : "down"}
          size={24}
          color="#eef2f3"
        />
      </TouchableOpacity>
      {showPrintOptions && (
        <PrintOptions
          tipoLista={tipoLista}
          setTipoLista={setTipoLista}
          imprimirLista={imprimirLista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f3",
    paddingTop: 10,
    paddingBottom: 80, // Espaço para o footer de 70px
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  toggleFormButton: {
    alignSelf: "center",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 25,
  },
  toggleFormButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    marginBottom: 20,
  },
  footerPlaceholder: {
    backgroundColor: "transparent",
  },
  printToggle: {
    position: "absolute",
    bottom: 80, // 70px do footer + 10px extra
    right: 20,
    padding: 8,
    backgroundColor: "#007bff",
    borderWidth: 0.5,
    borderRadius: 25,
    elevation: 5,
  },
});

export default AlunosScreen;
