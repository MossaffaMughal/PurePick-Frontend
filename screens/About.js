import React from "react";
import { View, Text, StyleSheet } from "react-native";

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.detail}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E7D32",
  },
  detail: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
    paddingHorizontal: 20,
  },
});

export default About;