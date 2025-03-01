import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import iamgeMap from "../../assets/gps.png";
import listIntes from "../../assets/list.png";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Image source={iamgeMap} style={styles.imageStyle} />{" "}
      <Image source={listIntes} style={styles.imageStyle} />{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  containe: {},
  footer: {
    flexDirection: "row", // Alinha as imagens na horizontal
    justifyContent: "center", // Distribui o espaço entre as imagens
    alignItems: "center", // Alinha as imagens verticalmente no centro
    backgroundColor: "#0D47A1",
    width: "100%",
    position: "absolute",
    height: 60,
    bottom: 0,
  },
  imageStyle: {
    width: 30,
    height: 30,
    marginHorizontal: 30,
  },
});
