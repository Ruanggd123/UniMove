import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FormAlunos({
  name,
  setName,
  selectOpcao,
  setSelectOpcao,
  localSubir,
  setLocalSubir,
  localDescer,
  setLocalDescer,
  handleEnviar,
}) {
  // Estados locais para armazenar a seleção do picker de cada local
  const [pickerSubir, setPickerSubir] = useState("");
  const [pickerDescer, setPickerDescer] = useState("");

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Opção:</Text>
        <Picker
          selectedValue={selectOpcao}
          style={styles.picker}
          onValueChange={(value) => {
            setSelectOpcao(value);
            // Reinicia as seleções de local ao mudar a opção
            setPickerSubir("");
            setPickerDescer("");
            setLocalSubir("");
            setLocalDescer("");
          }}
        >
          <Picker.Item label="Subir" value="Subir" />
          <Picker.Item label="Descer" value="Descer" />
          <Picker.Item label="Descer/Subir" value="DescerSubir" />
        </Picker>
      </View>

      {(selectOpcao === "Subir" || selectOpcao === "DescerSubir") && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Local de Subida:</Text>
            <Picker
              selectedValue={pickerSubir}
              style={styles.picker}
              onValueChange={(value) => {
                setPickerSubir(value);
                if (value !== "other") {
                  // Atualiza diretamente o local de subida com o valor escolhido
                  setLocalSubir(value);
                } else {
                  // Caso "Outro", limpa para que o usuário digite
                  setLocalSubir("");
                }
              }}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="CCS" value="CCS" />
              <Picker.Item label="IFCE" value="IFCE" />
              <Picker.Item label="UFC" value="UFC" />
              <Picker.Item label="UVA" value="UVA" />
              <Picker.Item label="Outro" value="other" />
            </Picker>
          </View>
          {pickerSubir === "other" && (
            <TextInput
              placeholder="Digite o local de subida"
              style={styles.input}
              value={localSubir}
              onChangeText={setLocalSubir}
            />
          )}
        </>
      )}

      {(selectOpcao === "Descer" || selectOpcao === "DescerSubir") && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Local de Descida:</Text>
            <Picker
              selectedValue={pickerDescer}
              style={styles.picker}
              onValueChange={(value) => {
                setPickerDescer(value);
                if (value !== "other") {
                  setLocalDescer(value);
                } else {
                  setLocalDescer("");
                }
              }}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="CCS" value="CCS" />
              <Picker.Item label="IFCE" value="IFCE" />
              <Picker.Item label="UFC" value="UFC" />
              <Picker.Item label="UVA" value="UVA" />
              <Picker.Item label="Outro" value="other" />
            </Picker>
          </View>
          {pickerDescer === "other" && (
            <TextInput
              placeholder="Digite o local de descida"
              style={styles.input}
              value={localDescer}
              onChangeText={setLocalDescer}
            />
          )}
        </>
      )}

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
