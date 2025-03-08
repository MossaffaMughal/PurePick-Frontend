import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const NoAlternative = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left Side - Back Arrow */}
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BoycottCheck");
            }}
          >
            <Image
              source={require("../assets/images/back_arrow.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Title Text */}
        <View style={styles.center}>
          <Text style={styles.title}>Alternatives</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/images/search_icon.png")} // Replace with actual path
          style={[styles.searchIcon, { tintColor: "#cf3e3e" }]} // Custom red color
        />
        <TextInput
          placeholder="Search product by company"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
        />
      </View>

      {/* Image */}
      <Image
        source={require("../assets/images/no_alternate.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.noProductText}>No Alternative Found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center", // Center the items vertically
    justifyContent: "center",
    height: 120, // Header height
    backgroundColor: "#cf3e3e", // Custom red background color
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
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 40, // Adjusted for better spacing
  },
  noProductText: {
    marginTop: 20,
    fontSize: 27,
    fontWeight: "bold",
    color: "#FF6F61",
  },
});

export default NoAlternative;
