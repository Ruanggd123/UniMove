import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ListaAlunos({ titulo, lista, onDelete }) {
  const confirmDelete = (nome) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(nome),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.listBox}>
      <Text style={styles.title}>{titulo}</Text>
      {lista.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.nameItem}
          onLongPress={() => confirmDelete(item)}
        >
          <Text style={styles.nameText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  nameItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
