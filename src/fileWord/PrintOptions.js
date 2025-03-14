import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ref, remove, set, get } from "firebase/database";
import { database } from "../firebaseConfig";

// Função para formatar a data no formato brasileiro
const formatarData = (dataIso) => {
  const data = new Date(dataIso);
  return data.toLocaleString("pt-BR", {
    weekday: "long", // Exibe o dia da semana
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleDeleteAll = (setLastDeleted) => {
  Alert.alert(
    "Confirmar Exclusão",
    "Tem certeza de que deseja excluir todos os nomes?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          const alunosRef = ref(database, "alunos");
          remove(alunosRef); // Excluir todos os alunos

          // Registrar a data da exclusão
          const now = new Date().toISOString();
          set(ref(database, "lastDeleted"), { date: now });

          // Atualiza o estado com a data formatada
          setLastDeleted(formatarData(now));
        },
      },
    ]
  );
};

export default function PrintOptions({
  tipoLista,
  setTipoLista,
  imprimirLista,
}) {
  const [lastDeleted, setLastDeleted] = useState("");

  // Recupera a última data de exclusão quando o componente é montado
  useEffect(() => {
    const lastDeletedRef = ref(database, "lastDeleted");
    get(lastDeletedRef).then((snapshot) => {
      if (snapshot.exists()) {
        const lastDeletedDate = snapshot.val().date;
        setLastDeleted(formatarData(lastDeletedDate));
      }
    });
  }, []);

  return (
    <View style={styles.printOptions}>
      <Text style={styles.printOptionsText}>Opções de Impressão</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Gerar Lista:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoLista}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoLista(itemValue)}
            dropdownIconColor="#007bff"
          >
            <Picker.Item label="Ambas" value="Ambas" />
            <Picker.Item label="Subir" value="Subir" />
            <Picker.Item label="Descer" value="Descer" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={imprimirLista}>
        <Text style={styles.buttonText}>Imprimir</Text>
      </TouchableOpacity>

      {/* Botão de Excluir Todos */}
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleDeleteAll(setLastDeleted)}
      >
        <Text style={styles.buttonText}>Excluir Todos</Text>
      </TouchableOpacity>

      {/* Exibe a última data de exclusão */}
      {lastDeleted && (
        <Text style={styles.lastDeletedText}>
          Última exclusão: {lastDeleted}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  printOptions: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 280,
    alignSelf: "center",
    marginTop: 20,
  },
  printOptionsText: {
    fontSize: 20,
    fontWeight: "auto",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "auto",
    marginRight: 10,
    color: "#555",
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  lastDeletedText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
