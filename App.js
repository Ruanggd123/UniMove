import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "./src/screens/MapScreen.js";
import AlunoScreen from "./src/screens/AlunosScreen.js";
import MotoristaScreen from "./src/screens/MotoristaScreen.js";

import Footer from "./src/style/Footer.js"; // Se você quiser ainda usar o Footer

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Alunos" // Define "Alunos" como a tela inicial
        tabBar={() => <Footer />} // Aqui está utilizando o seu Footer personalizado
      >
        <Tab.Screen name="Alunos" component={AlunoScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Motorista" component={MotoristaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
