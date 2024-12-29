import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";

const NoAllergenFoundScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} title="Allergens" />

      {/* Background Image with Light Opacity */}
      <ImageBackground
        source={require("../assets/images/background-noAllergen.png")} // Replace with your background image path
        style={styles.backgroundImage}
      >
        {/* Empty View to fill the background image container */}
      </ImageBackground>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/images/safe-icon.png")} // Replace with your safe icon image
              style={styles.safeIcon}
            />
          </View>
          <Text style={styles.safeText}>Safe Product!</Text>
          <Text style={styles.subText}>No Allergen Found!</Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Check Another Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%", // Ensure background takes up the entire screen
    resizeMode: "cover",
    opacity: 0.25, // Apply opacity to background image only
    position: "absolute", // Position background absolutely
    top: 50, // Move the background image downward
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center", // Vertically centers the content
    alignItems: "center",
    paddingTop: 50, // Adjust for space for the header and background
    zIndex: 1, // Ensure content is on top of the background
  },
  card: {
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#086308",
    borderRadius: 25,
    paddingVertical: 40,
    width: "90%",
    alignItems: "center",
    marginTop: 0, // Ensures it's centered below the header
    marginBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  safeIcon: {
    tintColor: "#086308", // Dark green icon
    width: 140,
    height: 140,
  },
  safeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#086308", // Dark green text
    marginBottom: 10,
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#086308", // Dark green text
  },
  button: {
    padding: 10,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 50,
    marginTop: 20,
    alignItems: "center",
    width: 325,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default NoAllergenFoundScreen;
