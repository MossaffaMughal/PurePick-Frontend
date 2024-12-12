import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";

const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} title="About Us" />

      {/* Space below Header */}
      <View style={styles.headerSpacer} />

      {/* Content Cards */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Our Mission */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Mission")}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/mission.png")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardText}>Our Mission</Text>
          </View>
        </TouchableOpacity>

        {/* What We Offer */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Offer")}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/offer.png")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardText}>What We Offer</Text>
          </View>
        </TouchableOpacity>

        {/* Why PurePick */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("WhyPurePick")}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/why.png")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardText}>Why PurePick</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerSpacer: {
    height: 120, // Adjust as needed to match spacing in BoycottCheckScreen
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#086308", // Updated green color
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  textContainer: {
    backgroundColor: "#086308", // Updated green color
    paddingVertical: 10,
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AboutUsScreen;
