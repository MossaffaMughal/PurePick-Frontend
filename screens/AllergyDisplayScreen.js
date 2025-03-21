import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";

const AllergensDisplayScreen = ({ route, navigation }) => {
  // Extract data from navigation props
  const { allergensData, imageUri } = route.params || {};

  // Extract allergens and allergy names safely
  const allergens = allergensData?.Allergens
    ? allergensData.Allergens.split(", ")
    : [];
  const allergyNames = allergensData?.["Allergy name"]
    ? allergensData["Allergy name"].split(", ")
    : [];

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header navigation={navigation} title="Allergens" />

      {/* Allergen Information Card */}
      <View style={styles.card}>
        {/* Allergen Image */}
        <Image
          source={require("../assets/images/ingredients.png")}
          style={styles.backgroundImage}
        />

        {/* Content Section with White Background */}
        <View style={styles.contentContainer}>
          <View style={styles.warningContainer}>
            <Image
              source={require("../assets/images/warning-icon.png")}
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>PRODUCT MAY CAUSE</Text>
          </View>

          {/* Display Allergy Names */}
          <View style={styles.allergyBox}>
            <Text style={styles.allergyText}>
              {allergyNames.length > 0
                ? allergyNames.join(", ")
                : "No Allergies Detected"}
            </Text>
          </View>

          <Text style={styles.ingredientsHeading}>
            INGREDIENTS CAUSING ALLERGIES:
          </Text>

          {/* Display Allergen Ingredients as Tags */}
          <View style={styles.ingredientTagsContainer}>
            {allergens.length > 0 ? (
              allergens.map((ingredient, index) => (
                <Text
                  key={index}
                  style={[styles.ingredientTag, getIngredientColor(index)]}
                >
                  {ingredient}
                </Text>
              ))
            ) : (
              <Text style={styles.noAllergensText}>No allergens detected</Text>
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

// Function to generate dynamic colors for allergens
const getIngredientColor = (index) => {
  const colors = [
    "#a7c4ae",
    "#779a7f",
    "#e7b2a0",
    "#bba9cd",
    "#8dc0c0",
    "#cebddf",
    "#acb9c8",
  ];
  return { backgroundColor: colors[index % colors.length], color: "white" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#086308",
    borderRadius: 18,
    marginTop: 150,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backgroundImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 13,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    height: 320,
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
    borderColor: "#086308",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  allergyText: {
    fontSize: 14,
    color: "#086308",
    textAlign: "center",
    fontWeight: "bold",
  },
  ingredientsHeading: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#086308",
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
  noAllergensText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
