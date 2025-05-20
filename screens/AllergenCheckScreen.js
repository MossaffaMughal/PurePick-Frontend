import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";

// const APILAYER_API_KEY = "GNxoWDh5kynYALlnPiHcu1RmYTBxQSDA"; // APILAYER API Key
const APILAYER_API_KEY = "tGq8UhBVwUfIzhkjg7pV1uSd9b8IcF0E"; // API Key
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"; // ImageKit upload endpoint
const IMAGEKIT_PUBLIC_KEY = "public_EaKR7nhsODNsHxMrSIiVZ3gC5Ek="; // ImageKit public key
const BACKEND_URL = "http://192.168.168.20:8000/purepick/check_allergen/";

const AllergenCheckScreen = ({ navigation }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Capture Image
  const captureImage = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true, // Ensure base64 conversion
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image selected:", result.assets[0].uri);
      handleImageResponse(result.assets[0]);
    }
  };

  // 🖼 Select Image from Gallery
  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery access is needed.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true, // Ensure base64 conversion
      quality: 1,
    });

    if (!result.canceled) {
      handleImageResponse(result.assets[0]);
    }
  };

  // 📍 Handle Image Selection & Perform OCR
  const handleImageResponse = async (image) => {
    console.log("Handle Image response function");
    setPhotoUri(image.uri);
    console.log("Selected photo uri");
    setLoading(true);
    // setShowOverlay(true);
    console.log("Selected Image URI:", image.uri);

    try {
      // Upload the file using its URI
      const imageUrl = await uploadToImageKit(image.uri);
      await performOCR(imageUrl);
    } catch (error) {
      console.error("❌ Error processing image:", error);
      Alert.alert("Error", "Failed to process the image. Please try again.");
    }

    setLoading(false);
  };

  const uploadToImageKit = async (fileUri) => {
    try {
      const formData = new FormData();
      formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
      formData.append("file", {
        uri: fileUri,
        name: "uploaded_image.jpg",
        type: "image/jpeg", // Ensure this matches the file type
      });
      formData.append("fileName", "uploaded_image.jpg");

      const privateKey = "private_KuyoCG6QIwKTEQX/HGrKa1/6GIE=";
      const encodedAuth = btoa(`${privateKey}:`);

      console.log("Uploading to ImageKit...");
      const response = await fetch(IMAGEKIT_UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },

        body: formData,
      });
      console.log("Upload response received");

      const data = await response.json();
      console.log("ImageKit Response:", data);

      if (!data || !data.url) {
        throw new Error("Failed to get image URL from ImageKit.");
      }

      return data.url; // Return the public URL
    } catch (error) {
      console.error("❌ Error uploading to ImageKit:", error);
      throw error;
    }
  };

  // 🔹 Perform OCR using APILayer API
  const performOCR = async (imageUrl) => {
    try {
      console.log("Performing OCR...");

      const response = await fetch(
        `https://api.apilayer.com/image_to_text/url?url=${imageUrl}`,
        {
          method: "GET",
          headers: {
            apikey: APILAYER_API_KEY,
          },
        }
      );

      const data = await response.json();
      console.log("OCR API Response:", data);

      if (data && data["all_text"]) {
        setExtractedText(data["all_text"]);
        await detectAllergens(data["all_text"]);
      } else {
        setExtractedText("No text detected");
        Alert.alert("Error", "Could not extract text from image.");
      }
    } catch (error) {
      console.error("❌ Error performing OCR:", error);
      setExtractedText("Error extracting text.");
    }
  };

  // 🔹 Send extracted text to backend for allergen detection
  const detectAllergens = async (ingredientsText) => {
    try {
      console.log("Sending to backend for allergen detection...");

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: ingredientsText }),
      });

      const result = await response.json();
      console.log("Backend Response:", result);

      if (result.error) {
        Alert.alert("Error", "Failed to detect allergens.");
        return;
      }

      // ✅ Check if allergens exist, then navigate accordingly
      if (result.response.Allergens) {
        navigation.navigate("AllergenDisplay", {
          allergensData: result.response,
          imageUri: photoUri,
        });
      } else {
        navigation.navigate("NoAllergenFound");
      }
    } catch (error) {
      console.error("❌ Error detecting allergens:", error);
      Alert.alert("Error", "Failed to connect to backend.");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background-allergen.png")}
          style={styles.backgroundImage}
        />
        <Header navigation={navigation} title="Allergen Check Screen" />
        {/* Image Display Section */}
        <View style={styles.barcodeContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.allergenImg} />
          ) : (
            <Image
              source={require("../assets/images/ingredients.png")}
              style={styles.allergenImg}
            />
          )}
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {/* Capture Image Button */}
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <View style={styles.squareContainers}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, alignItems: "center", backgroundColor: "transparent" },
  backgroundImage: {
    position: "absolute",
    top: 20,
    left: 0,
    width: 450,
    height: 750,
    opacity: 0.9,
    zIndex: -1,
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
    marginTop: 180,
  },
  scanText: {
    color: "#086308",
    fontSize: 16,
    fontWeight: "bold",
  },
  allergenImg: {
    width: 260,
    height: 170,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#086308",
    borderRadius: 20,
    width: 300,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 20 },
  squareContainers: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 120,
    alignContent: "center",
  },
  squareContainers: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 120,
    alignContent: "center",
  },
  squareContainer: {
    marginTop: 70,
    width: 145,
    height: 145,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 4,
  },
  leftContainer: {
    marginRight: 10,
    backgroundColor: "#086308",
    borderColor: "white",
  },
  leftText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
  },
  rightContainer: {
    backgroundColor: "white",
    borderColor: "#086308",
  },
  rightText: {
    color: "#086308",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
  },
  optionIcon: {
    width: 70,
    height: 70,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    backgroundColor: "#086308", // Customize footer color as needed
    width: "100%",
    position: "absolute", // Fix the footer to the bottom
    bottom: 0, // Set the footer to the bottom of the screen
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 10,
    tintColor: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AllergenCheckScreen;
