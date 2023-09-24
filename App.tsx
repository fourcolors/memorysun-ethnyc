// Globals
// global.TextEncoder = require("text-encoding").TextEncoder;
// import './shim.js';
// import { TextDecoder, TextEncoder } from "text-encoding";

// global.TextEncoder = global.TextEncoder || TextEncoder;
// global.TextDecoder = global.TextDecoder || TextDecoder;
import "fast-text-encoding";

import { useAuthStorage } from "@/store/authStore";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { WalletConnectModal } from "@walletconnect/modal-react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import AppNavigator from "./AppNavigation"; // adjust the import as needed
const APIURL = "https://api-v2-mumbai.lens.dev/";

const authLink = setContext((_, { headers }) => {
  const token = useAuthStorage((state) => state.token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default function App() {
  const projectId = "da92e4806f454ed1669d49752762e627";

  const providerMetadata = {
    name: "Memory Sun",
    description: "Memory Sun - Public Shared Memory",
    url: "https://www.memorysun.com/",
    icons: ["https://your-project-logo.com/"],
    redirect: {
      native: "com.memorysun.app://",
      universal: ".com",
    },
  };
  return (
    <ApolloProvider client={apolloClient}>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
