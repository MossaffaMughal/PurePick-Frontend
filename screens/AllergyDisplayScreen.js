import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";

const AllergensDisplayScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header navigation={navigation} title="Allergens" />

      {/* Allergen Information Card */}
      <View style={styles.card}>
        {/* Allergen Image */}
        <Image
          source={require("../assets/images/ingredients.png")} // Dummy path
          style={styles.backgroundImage}
        />

        {/* Content Section with White Background */}
        <View style={styles.contentContainer}>
          <View style={styles.warningContainer}>
            <Image
              source={require("../assets/images/warning-icon.png")} // Dummy path for small icon
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>PRODUCT MAY CAUSE</Text>
          </View>
          <View style={styles.allergyBox}>
            <Text style={styles.allergyText}>
              Peanut Allergy, Lactose Intolerance, Egg Allergy
            </Text>
          </View>

          <Text style={styles.ingredientsHeading}>
            INGREDIENTS CAUSING ALLERGIES:
          </Text>
          <View style={styles.ingredientTagsContainer}>
            {["Peanuts", "Milk", "Butter", "Cheese", "Eggs", "Albumin"].map(
              (ingredient, index) => (
                <Text
                  key={index}
                  style={[
                    styles.ingredientTag,
                    styles[`ingredient${ingredient}`], // Dynamically apply colors
                  ]}
                >
                  {ingredient}
                </Text>
              )
            )}
          </View>
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
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#086308", // Dark green background for the card
    borderRadius: 18,
    marginTop: 150,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backgroundImage: {
    width: "100%",
    height: 150,
    // marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 13,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  contentContainer: {
    backgroundColor: "#ffffff", // White background for content
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginBottom: 20,
    marginTop: -10,
    paddingBottom: 20,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  warningIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#086308",
    textAlign: "center",
  },
  allergyBox: {
    borderWidth: 2,
    borderColor: "#086308", // Dark green border
    borderRadius: 10,
    backgroundColor: "#ffffff", // White background
    padding: 10,
    marginBottom: 15, // Spacing below the box
    width: "100%", // Full width of the container
  },
  allergyText: {
    fontSize: 14,
    color: "#086308", // Dark green text
    textAlign: "center",
    fontWeight: "bold",
  },
  ingredientsHeading: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#086308", // Dark text for ingredients heading
    textAlign: "center",
  },
  ingredientTagsContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ingredientTag: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    fontSize: 13,
    width: 100,
    textAlign: "center",
    marginTop: 10,
  },
  // Custom background colors for allergens
  ingredientPeanuts: { backgroundColor: "#779a7f", color: "white" }, // Light green
  ingredientMilk: { backgroundColor: "#e7b2a0", color: "white" }, // Light peach
  ingredientButter: { backgroundColor: "#bba9cd", color: "white" }, // Light purple
  ingredientCheese: { backgroundColor: "#8dc0c0", color: "white" }, // Light turquoise (ferozi)
  ingredientEggs: { backgroundColor: "#cebddf", color: "white" }, // Soft peach
  ingredientAlbumin: { backgroundColor: "#acb9c8", color: "white" }, // Pale turquoise
  button: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "#257c25",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    width: 270,
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
    color: "#086308",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default AllergensDisplayScreen;
