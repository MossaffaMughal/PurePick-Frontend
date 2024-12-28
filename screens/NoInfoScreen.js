import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header"; // Adjust the path based on your file structure

const NoInfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Boycott Check" navigation={navigation} />

      {/* Illustration */}
      <Image
        source={require("../assets/images/product_not_found.png")} // Replace with your actual image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Message */}
      <Text style={styles.message}>No information about this product!</Text>

      {/* Scan Another Product Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BoycottCheck")}
      >
        <Text style={styles.buttonText}>Scan Another Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 150,
  },
  message: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3A7728",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 30,
    alignItems: "center",
    width: 280,
    height: 65,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
    zIndex: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default NoInfoScreen;
