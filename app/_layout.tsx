import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const APIURL = "https://api-v2--mumbai.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const AppLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    GrintoWide: require("../assets/fonts/ABCGintoNordWidthsVariable.ttf"),
    //  Grinto: require("../assets/fonts/ABCGintoNord.oft"), // not loading, punting on this
  });

  // might use this later
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <View onLayout={onLayoutRootView}>
        <Text style={{ fontFamily: "Grinto" }}>something</Text>
        <Slot />
      </View>
      {/* If app is ready (fonts loaded, API calls made, etc) then app loads else splash screen is shown */}
      {/* {appIsReady && fontsLoaded ? <Slot /> : <LoadingScreen />} */}
    </ApolloProvider>
  );
};

export default AppLayout;
