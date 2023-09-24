// AppNavigator.tsx
import { useAuthStorage } from "@/store/authStore";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import LoginScreen from "./src/screens/Login"; // adjust path as needed
import MapScreen from "./src/screens/Map"; // adjust path as needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  const token = useAuthStorage((state) => state.token);
  const [fontsLoaded, fontError] = useFonts({
    GrintoWide: require("./assets/fonts/ABCGintoNordWidthsVariable.ttf"),
    //  Grinto: require("../assets/fonts/ABCGintoNord.oft"), // not loading, punting on this
  });

  return (
    <Stack.Navigator initialRouteName="Login">
      {false ? (
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
