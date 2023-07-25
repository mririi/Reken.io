import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Menu from '@screens/Tabs/Menu';
import FillManually from '@screens/Tabs/MenuItems/FillManually';
import TransactionDetails from '@screens/Tabs/MenuItems/TransactionDetails';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const MenuStackNavigator = () => {
  return (
    <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
            <Stack.Screen name="MenuScreen" component={Menu} />
            <Stack.Screen name="FillManually" component={FillManually} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
        </Stack.Navigator>
  )
}

export default MenuStackNavigator
