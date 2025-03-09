import React from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddNameWord = () => {
  //criamos o estado para armazenar os valores Input
  //const [texto, setTexto] = useState("");
  //agora criamos uma função para enviar os dados para o fire base
  const enviarDados = async () => {};

  return (
    <View>
      <TextInput placeholder="Digite Seu nome" />
      <Button title="Save Name" />
    </View>
  );
};
export default AddNameWord;

const style = StyleSheet.create({
  textInput: {},
});
