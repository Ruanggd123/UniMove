import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FormAlunos({
  name,
  setName,
  seletLocation,
  setSeletLocation,
  customLocation,
  setCustomLocation,
  selectOpcao,
  setSelectOpcao,
  handleEnviar,
}) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Local:</Text>
        <Picker
          selectedValue={seletLocation}
          style={styles.picker}
          onValueChange={setSeletLocation}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="CCS" value="CCS" />
          <Picker.Item label="IFCE" value="IFCE" />
          <Picker.Item label="UFC" value="UFC" />
          <Picker.Item label="UVA" value="UVA" />
          <Picker.Item label="Outro" value="other" />
        </Picker>
      </View>
      {seletLocation === "other" && (
        <TextInput
          placeholder="Digite o local"
          style={styles.input}
          value={customLocation}
          onChangeText={setCustomLocation}
        />
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Opção:</Text>
        <Picker
          selectedValue={selectOpcao}
          style={styles.picker}
          onValueChange={setSelectOpcao}
        >
          <Picker.Item label="Subir" value="Subir" />
          <Picker.Item label="Descer" value="Descer" />
          <Picker.Item label="Descer/Subir" value="DescerSubir" />
        </Picker>
      </View>
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
    color: "#555",
  },
  picker: {
    flex: 1,
    height: 50,
  },
});
