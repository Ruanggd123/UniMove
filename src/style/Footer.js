import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import iamgeMap from "../../assets/map.png";
import listIntes from "../../assets/graduate.png";
import motorista from "../../assets/driver.png";

export default function Footer() {
  const [selectedItem, setSelectedItem] = useState("alunos"); // Definindo "alunos" como o item principal
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedItem("map");
          navigation.navigate("Mapa");
        }}
      >
        <View style={styles.item}>
          <Image source={iamgeMap} style={styles.imageStyle} />
          <Text
            style={[
              styles.TextStyler,
              selectedItem === "map" && styles.selectedText,
            ]}
          >
            Mapa
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedItem("alunos");
          navigation.navigate("Alunos");
        }}
      >
        <View style={styles.item}>
          <Image source={listIntes} style={styles.imageStyle} />
          <Text
            style={[
              styles.TextStyler,
              selectedItem === "alunos" && styles.selectedText,
            ]}
          >
            Alunos
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedItem("motorista");
          navigation.navigate("Motorista");
        }}
      >
        <View style={styles.item}>
          <Image source={motorista} style={styles.imageStyle} />
          <Text
            style={[
              styles.TextStyler,
              selectedItem === "motorista" && styles.selectedText,
            ]}
          >
            Motorista
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0D47B1", // Cor de fundo do footer
    width: "100%",
    position: "absolute",
    height: 70,
    bottom: 0,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  TextStyler: {
    textAlign: "center",
    fontSize: 16,
    color: "#cdf",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#1565C0",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  item: {
    alignItems: "center",
  },
});
