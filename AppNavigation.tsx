// AppNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import LoginScreen from "./src/screens/Login"; // adjust path as needed
import MapScreen from "./src/screens/Map"; // adjust path as needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [fontsLoaded, fontError] = useFonts({
    GrintoWide: require("./assets/fonts/ABCGintoNordWidthsVariable.ttf"),
    //  Grinto: require("../assets/fonts/ABCGintoNord.oft"), // not loading, punting on this
  });

  useEffect(() => {
    const init = async () => {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();

      // Load all resources here (e.g., perform API calls, load images, etc.)

      // Hide the splash screen
      await SplashScreen.hideAsync();
    };

    init();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
