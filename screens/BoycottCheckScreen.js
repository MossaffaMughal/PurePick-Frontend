import React from "react";
import { ScrollView } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import Header from "../components/Header";

const BoycottCheckScreen = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setBarcodeData(data);
    setLoading(true);

    try {
      // Fetch extracted data from the new API using Axios
      const options = {
        method: "GET",
        url: `https://product-lookup-by-upc-or-ean.p.rapidapi.com/code/${data}`,
        headers: {
          "x-rapidapi-key":
            "f887c2d552msh6f354d4fb3c716ep1b5ddbjsnb9c6e58713ea",
          "x-rapidapi-host": "product-lookup-by-upc-or-ean.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setExtractedData(response.data);
    } catch (error) {
      alert("Failed to fetch data from the barcode");
      console.error("Error fetching barcode data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Background Image - boycott */}
        <Image
          source={require("../assets/images/background-boycott.png")}
          style={styles.backgroundImageboycott}
        />

        {/* Header Section */}
        <Header navigation={navigation} title="Boycott Check Screen" />

        <View style={styles.barcodeContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          ></CameraView>
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {extractedData && (
          <View style={styles.productInfo}>
            <Text style={styles.title}>Extracted Data:</Text>
            <Text>{JSON.stringify(extractedData, null, 2)}</Text>
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("SafeProduct")}>
          <Text>Safe Product</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("BoycottProduct")}>
          <Text>Boycott Product</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setScanned(false); // Reset scanned state to allow scanning again
            setExtractedData(null); // Clear extracted data
          }}
        >
          <Text style={styles.buttonText}>
            {scanned ? "Scan Again" : "Scan Barcode"}
          </Text>
        </TouchableOpacity>

        {/* Square Containers */}
        <View style={styles.squareContainers}>
          {/* Left Square Container */}
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

          {/* Right Square Container */}
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

        {/* Footer Section */}
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
  scrollContent: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent", // Ensuring the background image shows through
  },
  backgroundImageboycott: {
    position: "absolute",
    top: 20,
    left: 0,
    width: 450,
    height: 750,
    opacity: 0.9,
    zIndex: -1, // Set this to a low index to keep background behind content
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
  button: {
    padding: 10,
    backgroundColor: "#086308",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 50,
    marginTop: 50,
    alignItems: "center",
    width: 300,
    height: 60,
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
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  barcodeContainer: {
    width: 300, // Adjust the width as needed
    height: 210, // Adjust the height as needed
    alignItems: "center", // Center the image horizontally
    justifyContent: "center", // Center the content vertically inside the rectangle
    backgroundColor: "#f0f0f0", // Light gray background for the container
    borderColor: "#086308",
    borderWidth: 4,
    borderRadius: 20, // Optional: rounded corners for the rectangle
    marginHorizontal: 20, // Optional: some margin on the left and right
    padding: 10, // Optional: padding around the image inside the container
    marginTop: 180,
  },
  barcodeImg: {
    width: 260, // Adjust the width as needed
    height: 170, // Adjust the height as needed
    borderRadius: 10,
  },
  lineContainer: {
    position: "absolute",
    top: "50%", // Center the line vertically over the barcode image
    left: 0,
    width: 295,
    height: 2, // Line thickness
    backgroundColor: "#086308",
    borderWidth: 2,
    borderColor: "#086308",
    zIndex: 1,
  },
  squareContainers: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 120,
    alignContent: "center",
  },
  squareContainer: {
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
  camera: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  productInfo: {
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
});

export default BoycottCheckScreen;
