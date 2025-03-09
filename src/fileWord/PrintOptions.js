import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PrintOptions({
  tipoLista,
  setTipoLista,
  imprimirLista,
}) {
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
