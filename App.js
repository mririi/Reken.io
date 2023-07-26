import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import configureStore from "./src/store/configureStore";
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
import MainStackNavigation from "./src/navigation/MainStackNavigator";
import { Platform } from "react-native";

enableScreens();
const APIKeys = {
  apple: "appl_ZivZqzCrMtILvpgYiIsebsKSTfC",
  google: "goog_wydwRUfOiUuHQCoWRNqXgOadzwV",
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const store = configureStore();
  Purchases.configure({ apiKey:Platform.OS==="ios"?APIKeys.apple:APIKeys.google, appUserID: null, observerMode: false, useAmazon: false });
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
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
