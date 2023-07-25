import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "@constants/colors";
import Spending from "../screens/Tabs/Spending";
import Transactions from "../screens/Tabs/Transactions";
import Settings from "../screens/Tabs/Settings";
import Home from "@screens/Tabs/Home";
import normalize from "react-native-normalize";
import CustomText from "../component/CustomText";
import Menu from "../screens/Tabs/Menu";
import SettingsStackNavigator from "./SettingsStackNavigator";
import MenuStackNavigator from "./MenuStackNavigator";

const Tab = createBottomTabNavigator();
const BottomTabsNavigation = () => {

  return (
    <View style={styles.screen}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let IconSource;

            if (route.name === "Home") {
              IconSource = !focused
                ? require("@assets/home-icon.png")
                : require("@assets/home-focused-icon.png");
            } else if (route.name === "Spending") {
              IconSource = !focused
                ? require("@assets/wallet-icon.png")
                : require("@assets/wallet-focused-icon.png");
            } else if (route.name === "Transaction") {
              IconSource = !focused
                ? require("@assets/money-icon.png")
                : require("@assets/money-focused-icon.png");
            } else if (route.name === "Settings") {
              IconSource = !focused
                ? require("@assets/user-icon.png")
                : require("@assets/user-focused-icon.png");
            }
            return (
              //   <Icon
              //     style={{
              //       color: focused ? colors.secondary : colors.text,
              //       //tintColor: focused ? colors.primary : colors.secondary,
              //       marginTop: focused ? 5 : 15,
              //     }}
              //     name={IconName}
              //     size={20}
              //   />
              <>
                {!focused && (
                  <>
                    <Image
                      source={IconSource}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(20),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(5),
                      }}
                    >
                      {route.name}
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: "black",
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.primary,
                      }}
                    >
                      <Image
                        source={IconSource}
                        style={{
                          width: normalize(15),
                          height: normalize(15),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(5),
                        color: colors.primary,
                      }}
                    >
                      {route.name}
                    </CustomText>
                  </>
                )}
              </>
            );
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.BottomTabIcon,
          tabBarLabelStyle: { fontSize: normalize(12) },
          tabBarStyle: {
            height: normalize(85),
            backgroundColor: "black",
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            backgroundColor: colors.BottomTabBG,
            height: normalize(100),
            width: normalize(80),
            paddingBottom: normalize(35),
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Spending"
          component={Spending}
          options={{
            title: "Spending",
            tabBarLabel: "Spending",
            tabBarItemStyle: {
              borderTopRightRadius: normalize(20),
              backgroundColor: colors.BottomTabBG,
              height: normalize(90),
            },
            tabBarIcon: ({ focused }) => (
              <>
                {!focused && (
                  <>
                    <Image
                      source={require("@assets/wallet-icon.png")}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(20),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                      }}
                    >
                      Spending
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: "black",
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.primary,
                      }}
                    >
                      <Image
                        source={require("@assets/wallet-focused-icon.png")}
                        style={{
                          width: normalize(15),
                          height: normalize(15),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                        color: colors.primary,
                      }}
                    >
                      Spending
                    </CustomText>
                  </>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStackNavigator}
          options={{
            title: "",
            tabBarLabel: "Menu",
            tabBarIcon: ({ focused }) => (
              <>
                <View
                  style={{
                    backgroundColor: "black",
                    width: "100%",
                    height: normalize(70),
                    borderBottomStartRadius: normalize(50),
                    borderBottomEndRadius: normalize(50),
                    position: "absolute",
                    top: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={
                      !focused
                        ? require("@assets/menu-icon.png")
                        : require("@assets/menu-focused-icon.png")
                    }
                    style={{
                      width: normalize(22),
                      height: normalize(22),
                      position: "absolute",
                      top: normalize(15),
                    }}
                  />
                </View>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={Transactions}
          options={{
            title: "Transaction",
            tabBarLabel: "Transaction",
            tabBarItemStyle: {
              borderTopLeftRadius: normalize(20),
              backgroundColor: colors.BottomTabBG,
              height: normalize(90),
            },
            tabBarIcon: ({ focused }) => (
              <>
                {!focused && (
                  <>
                    <Image
                      source={require("@assets/money-icon.png")}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(17),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                      }}
                    >
                      Transaction
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: "black",
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.primary,
                      }}
                    >
                      <Image
                        source={require("@assets/money-focused-icon.png")}
                        style={{
                          width: normalize(20),
                          height: normalize(20),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                        color: colors.primary,
                      }}
                    >
                      Transaction
                    </CustomText>
                  </>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default BottomTabsNavigation;
