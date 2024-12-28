import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header"; // Assuming you have a reusable Header component

const FeedbackInputScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    // Check if either rating or comments are empty
    if (rating === 0 || comments.trim() === "") {
      // If invalid, navigate to the FeedbackFailedScreen
      navigation.navigate("FeedbackFailed");
    } else {
      // If valid, navigate to the FeedbackSubmittedScreen
      navigation.navigate("FeedbackSubmitted");
    }
    setRating(0); // Reset rating to 0
    setComments(""); // Reset comments to empty string
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Green Header */}
        <Header navigation={navigation} title="Feedback" />

        {/* Image */}
        <Image
          source={require("../assets/images/feedback_image.png")}
          style={styles.image}
        />

        {/* Feedback Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Please Rate Your Experience</Text>

          {/* Star Rating */}
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
                style={styles.starButton}
              >
                <AntDesign
                  name={index < rating ? "star" : "staro"}
                  size={30}
                  color={index < rating ? "#FFD700" : "#C0C0C0"} // Gold for selected, silver for unselected
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Additional Comments */}
          <TextInput
            style={styles.textArea}
            placeholder="Additional Comments"
            multiline
            numberOfLines={4}
            value={comments}
            onChangeText={setComments}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingHorizontal: 0, // Ensure no padding on the container (keeps header intact)
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure scroll view takes full width
    paddingHorizontal: 0, // Remove any horizontal padding
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingHorizontal: 30, // Adds padding to the left and right side of the form only
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5, // Shadow for iOS
    marginTop: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 330,
    height: 260,
    marginTop: 140,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#086308", // Green color for the header
    textAlign: "center",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starButton: {
    marginHorizontal: 5,
  },
  textArea: {
    height: 120,
    borderColor: "#086308",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top", // Align text to the top of the text area
    fontSize: 16,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    alignItems: "center",
    width: 280,
    height: 65,
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
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default FeedbackInputScreen;
