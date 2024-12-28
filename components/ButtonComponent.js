// src/components/ButtonComponent.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonComponent = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "white",
    borderColor: "#008000",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    width: 220,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: "#0d640d",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ButtonComponent;
