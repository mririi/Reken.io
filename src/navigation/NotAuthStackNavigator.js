import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import GetStartedScreen from "@screens/GetStartedScreen";
import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import ForgotPassword from "@screens/Auth/ForgotPassword";
import ResetPassword from "@screens/Auth/ResetPassword";
import CodeConfirmation from "@screens/Auth/CodeConfirmation";
import BottomTabsNavigation from './BottomTabsNavigation';
import { Platform } from "react-native";

const Stack = createStackNavigator();

const NotAuthStackNavigator = () => {
  return (
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
  )
}

export default NotAuthStackNavigator
