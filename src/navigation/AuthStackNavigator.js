import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import BottomTabsNavigation from "./BottomTabsNavigation";
import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import ForgotPassword from "@screens/Auth/ForgotPassword";
import ResetPassword from "@screens/Auth/ResetPassword";
import CodeConfirmation from "@screens/Auth/CodeConfirmation";
import FillManually from "../screens/Tabs/MenuItems/FillManually";
import Menu from "../screens/Tabs/Menu";
const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CodeConfirmation" component={CodeConfirmation} />
      <Stack.Screen name="FillManually" component={FillManually} />
      <Stack.Screen name="MenuScreen" component={Menu} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
