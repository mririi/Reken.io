import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Settings from '@screens/Tabs/Settings';
import EditProfile from '@screens/Tabs/SettingsItems/EditProfile';
import Subscription from '@screens/Tabs/SettingsItems/Subscription';
import PrivacyPolicy from '@screens/Tabs/SettingsItems/PrivacyPolicy';
import DeleteAccount from '@screens/Tabs/SettingsItems/DeleteAccount';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
            <Stack.Screen name="SettingsScreen" component={Settings} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Subscription" component={Subscription} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        </Stack.Navigator>
  )
}

export default SettingsStackNavigator
