import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import configureStore from "./src/store/configureStore";
import StackNavigation from "./src/navigation/StackNavigation";
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
enableScreens();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "poppins-regular": require("@assets/fonts/Poppins-Regular.ttf"),
          "poppins-bold": require("@assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  console.log("Purchases", Purchases)
    // Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({ apiKey: "goog_wydwRUfOiUuHQCoWRNqXgOadzwV", appUserID: null, observerMode: false, useAmazon: false });
  //Declaring the stack navigator
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
