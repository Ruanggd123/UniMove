import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CardsLocais = ({ local, nomes, concluido, confirmarConclusao }) => {
  return (
    <View style={[styles.card, concluido && styles.cardConcluido]}>
      <TouchableOpacity
        style={styles.cardContent}
        onLongPress={() => confirmarConclusao(local)}
      >
        <Text style={styles.cardTitle}>{local}</Text>
        {nomes.map((nome, index) => (
          <Text key={index} style={styles.cardText}>
            {nome.name}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 5,
    padding: 10,
    elevation: 3,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginBottom: 15,
  },
  cardConcluido: {
    backgroundColor: "#4CAF50",
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    marginVertical: 3,
  },
});

export default CardsLocais;
