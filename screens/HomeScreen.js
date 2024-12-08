// src/screens/HomeScreen.js
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image - health*/}
      <Image
        source={require("../assets/images/background_health.png")}
        style={styles.backgroundImagehealth}
      />
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Buttons */}
      <ButtonComponent
        title="Allergen Check"
        onPress={() => navigation.navigate("AllergenCheck")}
        style={styles.button}
      />
      <ButtonComponent
        title="Boycott Check"
        onPress={() => navigation.navigate("BoycottCheck")}
        style={styles.button}
      />

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/images/home_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("About")}
        >
          <Image
            source={require("../assets/images/about_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Background Image - boycott */}
      <Image
        source={require("../assets/images/background_boycott.png")}
        style={styles.backgroundImageboycott}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
    marginBottom: 30,
    backgroundColor: "transparent", // Ensuring the background image shows through
  },
  backgroundImagehealth: {
    position: "absolute",
    bottom: 300,
    width: 650,
    height: 650,
    opacity: 0.15,
    zIndex: 1,
  },
  backgroundImageboycott: {
    position: "absolute",
    top: 500,
    left: 0.1,
    width: 650,
    height: 650,
    opacity: 0.7,
    zIndex: -1,
    transform: [{ rotate: "-25deg" }, { scale: 1 }],
  },
  logo: {
    width: 400,
    height: 400,
    zIndex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    width: "80%", // Adjust the width to your preference
    paddingHorizontal: 10,
    zIndex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#0d640d",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    zIndex: 1,
  },
});

export default HomeScreen;
