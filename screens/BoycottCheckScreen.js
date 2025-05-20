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
    return <View />; // Early return to prevent rendering while checking permission
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
    console.log("Barcode scanned:", data); // Debugging barcode data

    try {
      console.log("Making request to external API with barcode:", data);

      const externalApiOptions = {
        method: "GET",
        url: `https://product-lookup-by-upc-or-ean.p.rapidapi.com/code/${data}`,
        headers: {
          "x-rapidapi-key":
            // "f887c2d552msh6f354d4fb3c716ep1b5ddbjsnb9c6e58713ea",
            "f887c2d552msh6f354d4fb3c716ep1b5ddbjsnb9c6e58713ea",
          "x-rapidapi-host": "product-lookup-by-upc-or-ean.p.rapidapi.com",
        },
      };

      const externalApiResponse = await axios.request(externalApiOptions);
      console.log("External API response:", externalApiResponse.data); // Debugging response

      if (
        !externalApiResponse.data ||
        !externalApiResponse.data.product ||
        Object.keys(externalApiResponse.data.product).length === 0
      ) {
        console.warn("No product data found in the external API response.");
        navigation.navigate("NoInfo", {
          message:
            "No information found for the scanned product. Please try another item.",
        });
        return;
      }

      const brandName = externalApiResponse.data.product?.brand || "Unknown";
      console.log("Extracted brand name:", brandName);

      console.log("Sending request to backend with brand:", brandName);
      const backendApiResponse = await axios.post(
        "http://192.168.168.20:8000/purepick/check_boycott/",
        { brand: brandName },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Backend API response:", backendApiResponse.data); // Debugging backend response

      const { status, message, country_of_manufacture } =
        backendApiResponse.data;

      if (status === "boycotted") {
        console.log("Product is boycotted.");
        navigation.navigate("BoycottProduct", {
          brand: brandName,
          reason: message,
          countryOfManufacture: country_of_manufacture,
          category: externalApiResponse.data.product?.category || "Unknown",
        });
      } else if (status === "not_boycotted") {
        console.log("Product is safe.");
        navigation.navigate("SafeProduct", { brand: brandName, message });
      } else {
        console.warn("Unexpected status:", status);
        navigation.navigate("NoInfo");
      }
    } catch (error) {
      console.log("Error occurred during barcode scan:", error);

      let userFriendlyMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        console.log("Backend error response:", error.response.data);
        console.log("Status code:", error.response.status);

        if (error.response.status === 404) {
          userFriendlyMessage =
            "No information found for the scanned product. Please try another item.";
        } else if (error.response.status === 409) {
          userFriendlyMessage =
            "There was a conflict with the request. Please try again.";
        }
      } else if (error.request) {
        console.log("No response received from backend:", error.request);
        userFriendlyMessage =
          "Could not connect to the server. Check your internet connection.";
      } else {
        console.log("Request setup error:", error.message);
      }

      navigation.navigate("NoInfo", { message: userFriendlyMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background-boycott.png")}
          style={styles.backgroundImageboycott}
        />

        <Header navigation={navigation} title="Boycott Check Screen" />

        <View style={styles.barcodeContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {extractedData && (
          <View style={styles.productInfo}>
            <Text style={styles.title}>Extracted Data:</Text>
            <Text>{JSON.stringify(extractedData, null, 2)}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Resetting scan state...");
            setScanned(false);
            setExtractedData(null);
          }}
        >
          <Text style={styles.buttonText}>
            {scanned ? "Scan Again" : "Scan Barcode"}
          </Text>
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
  scrollContent: {
    flexGrow: 1,
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
    marginTop: 40,
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
