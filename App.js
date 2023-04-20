import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import configureStore from "./src/store/configureStore";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Auth/Login";
import Register from "./src/screens/Auth/Register";
import ForgotPassword from "./src/screens/Auth/ForgotPassword";
import ResetPassword from "./src/screens/Auth/ResetPassword";
import CodeConfirmation from "./src/screens/Auth/CodeConfirmation";

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
  //Declaring the stack navigator
  const Stack = createStackNavigator();
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
          <Stack.Screen name="getStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="CodeConfirmation" component={CodeConfirmation} />

          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
