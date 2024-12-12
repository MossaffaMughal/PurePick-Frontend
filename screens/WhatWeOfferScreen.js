import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

const WhatWeOfferScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#ffffff", "#e8ffe8", "#ccffcc"]}
      style={styles.gradient}
    >
      {/* Header */}
      <Header navigation={navigation} title="What We Offer" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card 1: Allergen Check */}
        <View style={styles.card}>
          <Image
            source={require("../assets/images/health_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Allergen Detection</Text>
          <Text style={styles.cardDescription}>
            PurePick uses smart AI to quickly scan and analyze product
            ingredients. It helps you spot harmful allergens or substances that
            could affect your health, whether you have food allergies, skin
            sensitivities, or other restrictions. This way, you can choose
            safely and confidently.
          </Text>
        </View>

        {/* Card 2: Ethical Boycott */}
        <View style={styles.card}>
          <Image
            source={require("../assets/images/boycott_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Ethical Choice Selection</Text>
          <Text style={styles.cardDescription}>
            PurePick helps you stay aware of products from companies involved in
            unethical practices. It alerts you when a product is linked to a
            boycott, so you can make responsible choices that match your values
            and avoid supporting harmful businesses.
          </Text>
        </View>

        {/* Card 3: Real-Time Analysis */}
        <View style={styles.card}>
          <Image
            source={require("../assets/images/analysis.png")}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Real-Time Analysis</Text>
          <Text style={styles.cardDescription}>
            With PurePick, you can easily scan product ingredients and barcodes
            using your phone’s camera. The app instantly gives you important
            details about allergens, harmful ingredients, and ethical concerns,
            helping you make better choices for your health and values.
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
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
    paddingTop: 140, // Add paddingTop to create space below the header
    paddingBottom: 100, // Ensure space at the bottom for the Home button
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 10,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
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

export default WhatWeOfferScreen;
