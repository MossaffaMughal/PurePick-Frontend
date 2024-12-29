import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";

const AllergenCheckScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/background-allergen.png")}
        style={styles.backgroundImage}
      />

      {/* Header Section */}
      <Header navigation={navigation} title="Allergen Check Screen" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Barcode Section */}
        <View style={styles.barcodeContainer}>
          <View style={styles.lineContainer} />
          <Image
            source={require("../assets/images/ingredients.png")}
            style={styles.allergenImg}
          />
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.buttonSec}
          onPress={() => navigation.navigate("AllergenDisplay")}
        >
          <Text style={styles.buttonText}>Allergen Display</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSec}
          onPress={() => navigation.navigate("NoAllergenFound")}
        >
          <Text style={styles.buttonText}>No Allergen Found</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upload Ingredients Image</Text>
        </TouchableOpacity>

        {/* Square Containers */}
        <View style={styles.squareContainers}>
          {/* Left Square Container */}
          <TouchableOpacity
            style={[styles.squareContainer, styles.leftContainer]}
            onPress={() => navigation.navigate("AllergenCheck")}
          >
            <Image
              source={require("../assets/images/health_icon.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.leftText}>Allergen</Text>
          </TouchableOpacity>

          {/* Right Square Container */}
          <TouchableOpacity
            style={[styles.squareContainer, styles.rightContainer]}
            onPress={() => navigation.navigate("BoycottCheck")}
          >
            <Image
              source={require("../assets/images/boycott_icon.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.rightText}>Boycott</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    zIndex: -1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 150, // Add padding to avoid overlap with header
    paddingBottom: 120, // Ensure content doesn't overlap with footer
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#086308",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    padding: 15,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: "center",
    width: 300,
    height: 65,
    elevation: 5,
  },
  buttonSec: {
    padding: 15,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: "center",
    width: 300,
    height: 65,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  barcodeContainer: {
    width: 300,
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#086308",
    borderWidth: 4,
    borderRadius: 20,
    marginTop: 20,
  },
  allergenImg: {
    width: 260,
    height: 170,
    borderRadius: 10,
  },
  lineContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: 3,
    backgroundColor: "#086308",
    zIndex: 1,
  },
  squareContainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  squareContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 4,
  },
  rightContainer: {
    backgroundColor: "#086308",
    borderColor: "white",
    marginLeft: 10,
  },
  rightText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  leftContainer: {
    backgroundColor: "white",
    borderColor: "#086308",
    marginRight: 10,
  },
  leftText: {
    color: "#086308",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  optionIcon: {
    width: 60,
    height: 60,
  },
});

export default AllergenCheckScreen;
