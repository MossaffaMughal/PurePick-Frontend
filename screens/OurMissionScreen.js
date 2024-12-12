import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

const OurMissionScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#ffffff", "#e8ffe8", "#ccffcc"]}
      style={styles.gradient}
    >
      <View style={styles.screenContainer}>
        {/* Header */}
        <Header navigation={navigation} title="Our Mission" />
        <View style={styles.container}>
          <Text style={styles.title}>Mission Of PurePick</Text>
          <Text style={styles.description}>
            "At PurePick, our mission is to empower consumers with the knowledge
            they need to make safe, ethical, and informed choices. Through
            cutting-edge AI and machine learning technology, we provide
            real-time product analysis by scanning ingredients and identifying
            harmful allergens and unethical practices. We are committed to
            promoting healthier, more responsible purchasing decisions for a
            better and more sustainable world."
          </Text>
        </View>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/images/home_icon_white.png")} // Replace with a suitable home icon path
            style={styles.homeIcon}
          />
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  screenContainer: {
    flex: 1, // Make sure the outer container takes the full screen
    alignItems: "center",
  },
  container: {
    margin: 20,
    marginTop: 180,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#333",
    lineHeight: 26,
    textAlign: "justify",
  },
  homeButton: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 60,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
    zIndex: 1,
  },
  homeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  homeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default OurMissionScreen;
