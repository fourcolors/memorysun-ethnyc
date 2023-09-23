// Globals
global.TextEncoder = require("text-encoding").TextEncoder;

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import AppNavigator from "./AppNavigation"; // adjust the import as needed
const APIURL = "https://api-v2-mumbai.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
