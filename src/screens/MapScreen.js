import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  // Região inicial para o mapa em Sobral, Ceará
  const initialRegion = {
    latitude: -3.687, // Coordenada de latitude de Sobral, Ceará
    longitude: -40.3456, // Coordenada de longitude de Sobral, Ceará
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Marcador na localização de Sobral, Ceará */}
        <Marker
          coordinate={{ latitude: -3.687, longitude: -40.3456 }}
          title="Ônibus"
          description="Localização do ônibus (futuro em tempo real)"
        />
      </MapView>

      {/* Sobreposição com informações do criador */}
      <View style={styles.infoOverlay}>
        <Text style={styles.infoTitle}>Criado por: Ruan Gomes</Text>
        <Text style={styles.infoSubtitle}>
          Futuramente, este mapa exibirá a localização em tempo real do ônibus.
          Por enquanto, é apenas um mapa normal.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoOverlay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
