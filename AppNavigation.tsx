// AppNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React from "react";
import LoginScreen from "./src/screens/Login"; // adjust path as needed
import MapScreen from "./src/screens/Map"; // adjust path as needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [fontsLoaded, fontError] = useFonts({
    GrintoWide: require("../assets/fonts/ABCGintoNordWidthsVariable.ttf"),
    //  Grinto: require("../assets/fonts/ABCGintoNord.oft"), // not loading, punting on this
  });

  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
