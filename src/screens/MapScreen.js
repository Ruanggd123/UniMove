import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Footer from "../style/Footer"; // Importando o rodapé
//import AddNameWord from "../fileWord/AddNameWord";

export default function MapScreen() {
  return <View style={styles.container}>{/* Rodapé dentro do Mapa */}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Permite o posicionamento do rodapé
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
