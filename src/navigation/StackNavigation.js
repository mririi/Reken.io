import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScreen from "@screens/GetStartedScreen";
import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import ForgotPassword from "@screens/Auth/ForgotPassword";
import ResetPassword from "@screens/Auth/ResetPassword";
import CodeConfirmation from "@screens/Auth/CodeConfirmation";
import BottomTabsNavigation from "./BottomTabsNavigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "@store/actions/auth";
import EditProfile from "../screens/Tabs/SettingsItems/EditProfile";
import ManageUsers from "../screens/Tabs/SettingsItems/ManageUsers";
import HelpAndSupport from "../screens/Tabs/SettingsItems/HelpAndSupport";
import Subscription from "../screens/Tabs/SettingsItems/Subscription";
import PrivacyPolicy from "../screens/Tabs/SettingsItems/PrivacyPolicy";
import DeleteAccount from "../screens/Tabs/SettingsItems/DeleteAccount";
import FillManually from "../screens/Tabs/MenuItems/FillManually";
import TransactionDetails from "../screens/Tabs/MenuItems/TransactionDetails";
const Stack = createStackNavigator();

const StackNavigation = () => {
  const [isAuth, setIsAuth] = useState(false);
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
        setLoading(false);
        setIsAuth(true);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <>
      {!isAuth && (
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
          <Stack.Screen
            name="BottomTabsNavigation"
            component={BottomTabsNavigation}
          />
        </Stack.Navigator>
      )}
      {isAuth && (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
          <Stack.Screen
            name="BottomTabsNavigation"
            component={BottomTabsNavigation}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ManageUsers" component={ManageUsers} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
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
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigation;
