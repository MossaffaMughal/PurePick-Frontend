import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AllergenCheckScreen from "../screens/AllergenCheckScreen";
import BoycottCheckScreen from "../screens/BoycottCheckScreen";
import About from "../screens/About";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllergenCheck" component={AllergenCheckScreen} />
        <Stack.Screen name="BoycottCheck" component={BoycottCheckScreen} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
