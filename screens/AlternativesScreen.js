import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";

const AlternativesScreen = ({ navigation, route }) => {
  const { category } = route.params || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false); // Track search actions
  const [alternatives, setAlternatives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (category) {
      fetchAlternatives(category);
    }
  }, [category]);

  const fetchAlternatives = async (category) => {
    try {
      setIsLoading(true);
      setNoResults(false);
      const response = await axios.post(
        "http://192.168.168.20:8000/purepick/get_alternatives/",
        { category: category },
        { headers: { "Content-Type": "application/json" } }
      );

      const { alternatives } = response.data;
      if (alternatives && alternatives.length > 0) {
        setAlternatives(alternatives);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching alternatives:", error);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && alternatives.length === 0 && noResults) {
      navigation.navigate("NoAlternative");
    }
  }, [isLoading, noResults, alternatives]);

  const filteredAlternatives = alternatives.filter((item) =>
    item.alternative_product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Alternatives" />

      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/images/search_icon.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search product by company"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSearchPerformed(true); // Mark that a search was performed
          }}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#086308" />
          <Text style={styles.loadingText}>Loading Alternatives...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {searchPerformed && filteredAlternatives.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                No Results Match Your Search
              </Text>
            </View>
          ) : (
            filteredAlternatives.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image
                  source={{ uri: `data:image/png;base64,${item.image_base64}` }}
                  style={styles.productImage}
                />
                <View style={styles.companyNameView}>
                  <Text style={styles.productName}>
                    {item.alternative_product}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Image
          source={require("../assets/images/arrow_down.png")}
          style={styles.footerIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: "#086308",
    fontWeight: "500",
  },
  gridContainer: {
    flexDirection: "row", // Align items in rows
    flexWrap: "wrap", // Wrap items to the next line if necessary
    justifyContent: "space-between", // Space evenly between items
    paddingHorizontal: 10, // Reduced horizontal padding for better alignment
    paddingBottom: 20, // Extra space at the bottom for scrolling
    marginTop: 10, // Added space above the grid
  },
  card: {
    backgroundColor: "white",
    borderColor: "#086308", // Green border color
    borderWidth: 1.5,
    borderRadius: 10, // Rounded edges
    width: "47%", // Two columns with some spacing
    marginBottom: 25, // Balanced margin between rows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, // Subtle shadow effect
    shadowRadius: 5,
    elevation: 4,
    alignItems: "center", // Center-align content inside cards
    // overflow: "hidden", // Ensures inner elements stay within the card bounds
    // height: 220, // Ensure height matches the content
  },
  companyNameView: {
    width: "100%", // Full width
    backgroundColor: "#086308", // Green background
    height: 55, // Match desired height
    alignItems: "center", // Center the text
    justifyContent: "center", // Vertically center the text
    paddingHorizontal: 10, // Padding for readability
    marginBottom: 0, // Remove any unintended margins
    paddingBottom: 0, // Ensure no internal padding at the bottom
    borderTopWidth: 0, // Prevent any additional borders
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  productImage: {
    width: "90%", // Slightly smaller than card width
    height: 135, // Adjusted height for balance with taller cards
    resizeMode: "contain",
    marginVertical: 10, // Balanced spacing around the image
  },
  productName: {
    fontSize: 15, // Slightly larger font size for emphasis
    fontWeight: "600",
    color: "white", // White text color for contrast
    textAlign: "center",
    lineHeight: 20, // Adjusted line spacing for readability
    numberOfLines: 1, // Ensure text does not overflow
    ellipsizeMode: "tail", // Add ellipsis if text is too long
  },

  noDataContainer: {
    flex: 1, // Ensures it takes the full available height of the screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  noDataText: {
    fontSize: 18,
    color: "#DC3545",
    textAlign: "center",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerIcon: {
    width: 30,
    height: 30,
    tintColor: "#086308", // Green for footer icons
  },
});

export default AlternativesScreen;
