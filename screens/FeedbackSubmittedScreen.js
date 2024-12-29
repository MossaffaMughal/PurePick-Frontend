import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Header from "../components/Header";

const FeedbackSubmittedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Feedback" />

      {/* Image */}
      <Image
        source={require("../assets/images/analysis.png")} // Add an appropriate image here
        style={styles.image}
      />

      {/* Message */}
      <Text style={styles.message}>Thank You!</Text>
      <Text style={styles.messageSec}>Your feedback has been submitted!</Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} // Navigate to Home or another screen
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 40,
  },
  message: {
    fontSize: 40,
    color: "#086308", // Text color remains green
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textShadowColor: "#d1d1d1", // Gray shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset (horizontal and vertical)
    textShadowRadius: 4, // Shadow blur radius
  },
  messageSec: {
    fontSize: 18,
    color: "#086308",
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
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
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center", // Center the items vertically
    justifyContent: "center",
    height: 120, // Header height
    backgroundColor: "#D32F2F", // Dull red shade (more muted)
    paddingHorizontal: 15, // Horizontal padding
    paddingTop: 35, // Extra top padding for safe area
    paddingBottom: 20,
    width: "100%",
    position: "absolute", // Fix the header at the top
    top: 0,
    left: 0,
    zIndex: 100, // Ensure it's above other content
  },
  left: {
    flex: 1,
    position: "absolute",
    left: 20,
    top: 55,
    alignItems: "center",
  },
  center: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default FeedbackSubmittedScreen;
