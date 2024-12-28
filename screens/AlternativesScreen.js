import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import NoAlternative from "./NoAlternative";

const AlternativesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header navigation={navigation} title="Alternatives" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/images/search_icon.png")} // Replace with actual path
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search by category e.g. biscuits"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
        />
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.row}>
          {/* Product Card 1 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/heart_cookie.png")} // Replace with actual image path
              style={styles.productImage}
            />
            <View style={styles.companyNameView}>
              <Text style={styles.companyName}>Company</Text>
            </View>
          </View>

          {/* Product Card 2 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/chocolate_cookie.png")} // Replace with actual image path
              style={styles.productImage}
            />
            <View style={styles.companyNameView}>
              <Text style={styles.companyName}>Company</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          {/* Product Card 3 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/biscuits.png")} // Replace with actual image path
              style={styles.productImage}
            />
            <View style={styles.companyNameView}>
              <Text style={styles.companyName}>Company</Text>
            </View>
          </View>

          {/* Product Card 4 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/square_biscuits.png")} // Replace with actual image path
              style={styles.productImage}
            />
            <View style={styles.companyNameView}>
              <Text style={styles.companyName}>Company</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Text
        style={styles.NoAlternative}
        onPress={() => navigation.navigate("NoAlternative")}
      >
        No Alternatives Found
      </Text>

      {/* Footer Arrow */}
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
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "white",
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
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    borderColor: "#2E7D32",
    borderWidth: 2,
    borderRadius: 10,
    width: "47%",
    height: 200,
    alignItems: "center",
    justifyContent: "space-between", // Distributes space evenly
    paddingTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingBottom: 0,
    marginBottom: 20,
  },
  productImage: {
    marginTop: 12,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  companyNameView: {
    width: "100%",
    backgroundColor: "#2E7D32",
    alignItems: "center",
    paddingVertical: 10, // Adds spacing inside the green background
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerIcon: {
    width: 25,
    height: 25,
    tintColor: "#2E7D32",
  },
  NoAlternative: {
    color: "#FF6F61",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default AlternativesScreen;
