import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AllergenCheckScreen from "../screens/AllergenCheckScreen";
import BoycottCheckScreen from "../screens/BoycottCheckScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import OurMissionScreen from "../screens/OurMissionScreen";
import WhatWeOfferScreen from "../screens/WhatWeOfferScreen";
import WhyPurePickScreen from "../screens/WhyPurePickScreen";
import SafeProductScreen from "../screens/SafeProductScreen";
import BoycottProductScreen from "../screens/BoycottProductScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        options={{
          gestureEnabled: false, // Disable gestures
          headerShown: false, // Hide header if you don't want a default one
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllergenCheck" component={AllergenCheckScreen} />
        <Stack.Screen name="BoycottCheck" component={BoycottCheckScreen} />
        <Stack.Screen name="About" component={AboutUsScreen} />
        <Stack.Screen name="Mission" component={OurMissionScreen} />
        <Stack.Screen name="Offer" component={WhatWeOfferScreen} />
        <Stack.Screen name="WhyPurePick" component={WhyPurePickScreen} />
        <Stack.Screen name="SafeProduct" component={SafeProductScreen} />
        <Stack.Screen name="BoycottProduct" component={BoycottProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
