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

const APILAYER_API_KEY = "GNxoWDh5kynYALlnPiHcu1RmYTBxQSDA"; // Replace with your valid API Key
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"; // ImageKit upload endpoint
const IMAGEKIT_PUBLIC_KEY = "public_EaKR7nhsODNsHxMrSIiVZ3gC5Ek="; // Replace with your ImageKit public key

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
    setPhotoUri(image.uri);
    setLoading(true);
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
      formData.append("file", {
        uri: fileUri,
        name: "uploaded_image.jpg",
        type: "image/jpeg", // Ensure this matches the file type
      });
      formData.append("fileName", "uploaded_image.jpg");

      const privateKey = "private_KuyoCG6QIwKTEQX/HGrKa1/6GIE=";
      const encodedAuth = btoa(`${privateKey}:`);

      const response = await fetch(IMAGEKIT_UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
        body: formData,
      });

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
      } else {
        setExtractedText("No text detected");
      }
    } catch (error) {
      console.error("❌ Error performing OCR:", error);
      setExtractedText("Error extracting text.");
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

        {/* Buttons for Capturing or Picking Image */}
        <TouchableOpacity
          style={styles.button}
          onPress={captureImage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>

        {/* Extracted Text Display */}
        {extractedText !== "" && (
          <View style={styles.extractedTextContainer}>
            <Text style={styles.title}>Extracted Text:</Text>
            <Text style={styles.extractedText}>{extractedText}</Text>
          </View>
        )}
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
  barcodeContainer: {
    width: 300,
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginTop: 180,
  },
  allergenImg: { width: 260, height: 170, borderRadius: 10 },
  extractedTextContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#086308",
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#086308",
  },
  extractedText: { fontSize: 16, color: "#333" },
});

export default AllergenCheckScreen;
