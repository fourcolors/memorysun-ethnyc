// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigator from "./AppNavigation"; // adjust the import as needed

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
