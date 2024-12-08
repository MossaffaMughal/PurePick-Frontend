import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BoycottCheckScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boycott Check</Text>
      <Text style={styles.description}>
        This screen will help users identify companies to boycott.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#C62828",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
    paddingHorizontal: 20,
  },
});

export default BoycottCheckScreen;
