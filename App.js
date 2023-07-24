import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import configureStore from "./src/store/configureStore";
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScreen from "@screens/GetStartedScreen";
import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import ForgotPassword from "@screens/Auth/ForgotPassword";
import ResetPassword from "@screens/Auth/ResetPassword";
import CodeConfirmation from "@screens/Auth/CodeConfirmation";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "@store/actions/auth";
import EditProfile from "@screens/Tabs/SettingsItems/EditProfile";
import Subscription from "@screens/Tabs/SettingsItems/Subscription";
import PrivacyPolicy from "@screens/Tabs/SettingsItems/PrivacyPolicy";
import DeleteAccount from "@screens/Tabs/SettingsItems/DeleteAccount";
import FillManually from "@screens/Tabs/MenuItems/FillManually";
import TransactionDetails from "@screens/Tabs/MenuItems/TransactionDetails";
import BottomTabsNavigation from "./src/navigation/BottomTabsNavigation";
// import Purchases from 'react-native-purchases';
enableScreens();

const Stack = createStackNavigator();

const StackNavigation = () => {
  const [isAuth, setIsAuth] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setLoading(false);
        setIsAuth(false);
      } else {
        dispatch(Auth.getUser());
        setIsAuth(true);
        setLoading(false);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: Platform.OS === "android" ? "modal" : null,
        }}
        cardStyle={{ backgroundColor: "transparent" }}
      >
      {isAuth && (
        <>
          <Stack.Screen
            name="BottomTabsNavigation"
            component={BottomTabsNavigation}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Subscription" component={Subscription} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
          <Stack.Screen name="FillManually" component={FillManually} />
          <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="CodeConfirmation" component={CodeConfirmation} />
      </>
      )}
      {!isAuth && (
        <>
          <Stack.Screen name="getStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="CodeConfirmation" component={CodeConfirmation} />
          <Stack.Screen
            name="BottomTabsNavigation"
            component={BottomTabsNavigation}
          />
          </>
          )}
          </Stack.Navigator>
  );
};

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
  // Purchases.configure({ apiKey: "goog_wydwRUfOiUuHQCoWRNqXgOadzwV", appUserID: null, observerMode: false, useAmazon: false });
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
