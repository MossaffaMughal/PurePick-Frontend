// src/components/Header.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      {/* Left Side - Back Arrow */}
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/images/back_arrow.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Title Text */}
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Center the items vertically
    justifyContent: "center",
    height: 120, // Set height of the header
    backgroundColor: "#086308", // Background color for the header
    paddingHorizontal: 15, // Add horizontal padding
    paddingTop: 30,
    paddingBottom: 20,
    width: "100%",
    position: "absolute", // Fix the header at the top
    top: 0, // Set it at the top of the screen
    left: 0, // Align it with the left edge
    zIndex: 100, // Ensure it's above other content
  },
  left: {
    flex: 1,
    position: "absolute", // Fix the header at the top
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

export default Header;
