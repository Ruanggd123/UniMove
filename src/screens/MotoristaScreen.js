import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebaseConfig";

export default function MotoristaScreen() {
  const [subirLocais, setSubirLocais] = useState([]);
  const [descerLocais, setDescerLocais] = useState([]);
  const [concluidosSubida, setConcluidosSubida] = useState({});
  const [concluidosDescida, setConcluidosDescida] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const alunosRef = ref(database, "alunos");
    onValue(alunosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let subirTemp = {};
        let descerTemp = {};
        let concluidosSubidaTemp = {};
        let concluidosDescidaTemp = {};

        Object.entries(data).forEach(([id, item]) => {
          if (item.subir) {
            if (!subirTemp[item.localSubir]) subirTemp[item.localSubir] = [];
            subirTemp[item.localSubir].push({ id, name: item.name });
            if (item.concluidoSubida) {
              concluidosSubidaTemp[item.localSubir] = true;
            }
          }
          if (item.descer) {
            if (!descerTemp[item.localDescer])
              descerTemp[item.localDescer] = [];
            descerTemp[item.localDescer].push({ id, name: item.name });
            if (item.concluidoDescida) {
              concluidosDescidaTemp[item.localDescer] = true;
            }
          }
        });

        setSubirLocais(Object.entries(subirTemp));
        setDescerLocais(Object.entries(descerTemp));
        setConcluidosSubida(concluidosSubidaTemp);
        setConcluidosDescida(concluidosDescidaTemp);
      } else {
        setSubirLocais([]);
        setDescerLocais([]);
        setConcluidosSubida({});
        setConcluidosDescida({});
      }
    });
  }, []);

  const confirmarConclusao = (local, tipo) => {
    Alert.alert(
      "Confirmar Conclusão",
      `Você deseja marcar a rota de "${local}" como concluída?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => marcarConcluido(local, tipo) },
      ]
    );
  };

  const marcarConcluido = (local, tipo) => {
    let novosConcluidosSubida = { ...concluidosSubida };
    let novosConcluidosDescida = { ...concluidosDescida };

    if (tipo === "subir") {
      novosConcluidosSubida[local] = true;
      setConcluidosSubida(novosConcluidosSubida);
      const updates = {};
      subirLocais.forEach(([loc, pessoas]) => {
        if (loc === local) {
          pessoas.forEach(({ id }) => {
            updates[`/alunos/${id}/concluidoSubida`] = true;
          });
        }
      });
      update(ref(database), updates);
    } else if (tipo === "descer") {
      novosConcluidosDescida[local] = true;
      setConcluidosDescida(novosConcluidosDescida);
      const updates = {};
      descerLocais.forEach(([loc, pessoas]) => {
        if (loc === local) {
          pessoas.forEach(({ id }) => {
            updates[`/alunos/${id}/concluidoDescida`] = true;
          });
        }
      });
      update(ref(database), updates);
    }

    Alert.alert("Rota Concluída!", `O local "${local}" foi finalizado ✅`);
    verificarTodosConcluidos();
  };

  const verificarTodosConcluidos = () => {
    const todosLocaisSubidaConcluidos = Object.keys(subirLocais).every(
      (local) => concluidosSubida[local]
    );
    const todosLocaisDescidaConcluidos = Object.keys(descerLocais).every(
      (local) => concluidosDescida[local]
    );

    if (todosLocaisSubidaConcluidos && todosLocaisDescidaConcluidos) {
      deletarLocaisConcluidos();
    }
  };

  const deletarLocaisConcluidos = () => {
    const updates = {};
    Object.entries(subirLocais).forEach(([local, pessoas]) => {
      pessoas.forEach(({ id }) => {
        if (concluidosSubida[local] && concluidosDescida[local]) {
          updates[`/alunos/${id}`] = null;
        }
      });
    });
    update(ref(database), updates);
    Alert.alert(
      "Todos os Locais Concluídos",
      "Você completou todos os locais e eles foram removidos!"
    );
  };

  const renderItem = ({ item, tipo }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setSelectedItem({ local: item[0], pessoas: item[1], tipo });
          setModalVisible(true);
        }}
      >
        <Text style={styles.localTitle}>{item[0]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Locais de Subida</Text>
      <FlatList
        data={subirLocais}
        keyExtractor={(item) => item[0]}
        renderItem={(item) => renderItem({ ...item, tipo: "subir" })}
        numColumns={3}
      />
      <Text style={styles.sectionTitle}>Locais de Descida</Text>
      <FlatList
        data={descerLocais}
        keyExtractor={(item) => item[0]}
        renderItem={(item) => renderItem({ ...item, tipo: "descer" })}
        numColumns={3}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>
                  Nomes - {selectedItem.local}
                </Text>
                <ScrollView style={styles.modalScroll}>
                  {selectedItem.pessoas.map((pessoa, index) => (
                    <Text key={pessoa.id} style={styles.modalNome}>
                      {index + 1}. {pessoa.name}
                    </Text>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", // Fundo azul muito suave
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2980b9",
    borderBottomWidth: 1,
    borderBottomColor: "#3498db",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#3498db", // Fundo dos cards em azul suave
    margin: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "29%",
    minHeight: 140,
    borderWidth: 1,
    borderColor: "#3498db",
  },
  localTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2980b9",
    marginBottom: 10,
  },
  modalScroll: {
    width: "100%",
    marginBottom: 20,
  },
  modalNome: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
