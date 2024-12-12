import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

const WhyPurePickScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#ffffff", "#d4edda", "#c3e6cb"]}
      style={styles.gradient}
    >
      {/* Header */}
      <Header navigation={navigation} title="Why PurePick" />
      <View style={styles.container}>
        {/* Benefits Section */}
        <View style={styles.benefitsContainer}>
          <View style={styles.row}>
            {/* Benefit 1 */}
            <View style={styles.benefitBox}>
              <Image
                source={require("../assets/images/health-hazard.png")}
                style={styles.icon}
              />
              <Text style={styles.benefitTitle}>Health First</Text>
              <Text style={styles.benefitDescription}>
                Products free from harmful allergens and chemicals.
              </Text>
            </View>

            {/* Benefit 2 */}
            <View style={styles.benefitBox}>
              <Image
                source={require("../assets/images/background-boycott.png")}
                style={styles.icon}
              />
              <Text style={styles.benefitTitle}>Ethical Choices</Text>
              <Text style={styles.benefitDescription}>
                Support companies that align with your values.
              </Text>
            </View>
          </View>

          {/* Benefit 3 */}
          <View style={[styles.benefitBox, { width: "100%" }]}>
            <Image
              source={require("../assets/images/ai.png")}
              style={styles.icon}
            />
            <Text style={styles.benefitTitle}>Cutting-Edge AI</Text>
            <Text style={styles.benefitDescription}>
              Real-time and accurate product insights with AI.
            </Text>
          </View>
        </View>

        {/* Call to Action */}
        <Text style={styles.callToAction}>
          Join the PurePick community today and take control of your health and
          ethics!
        </Text>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/images/home_icon_white.png")}
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
  container: {
    alignItems: "center",
    justifyContent: "flex-start", // Changed from space-between to flex-start
    flexGrow: 1, // Ensures the container stretches to take available space but doesn't force extra space
    padding: 20,
    paddingTop: 170,
  },
  benefitsContainer: {
    width: "100%",
    marginBottom: 90, // Added some space at the bottom to separate the benefits from the call-to-action text
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  benefitBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 65,
    height: 65,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008000",
    textAlign: "center",
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 18,
  },
  callToAction: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#008000",
    marginVertical: 10,
    lineHeight: 20,
  },
  homeButton: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginTop: 20,
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

export default WhyPurePickScreen;
