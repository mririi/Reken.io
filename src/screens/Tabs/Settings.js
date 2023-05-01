import React from "react";
import CustomText from "../../component/CustomText";
import { ImageBackground, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Auth from "@store/actions/auth";
import colors from "../../constants/colors";
import normalize from "react-native-normalize";
import { Image } from "react-native";
import CustomButton from "../../component/CustomButton";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
const Settings = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const SettingItem = ({ to, title }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(to)}
        style={{ marginVertical: normalize(15) }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CustomText style={{ color: "white" }}>{title}</CustomText>
          <Icon name="right" size={normalize(10)} color={"white"} />
        </View>
        <View
          style={{
            height: normalize(3),
            backgroundColor: "#757575",
            width: "100%",
            marginTop: normalize(10),
          }}
        ></View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ImageBackground
        source={require("@assets/home-half-circle.png")}
        style={{ width: "100%", height: normalize(200) }}
      >
        <View
          style={{
            marginTop: normalize(60),
            width: "90%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <CustomText title="true" style={{ textAlign: "center" }}>
              {user && user.name ? user.name : "No name available"}
            </CustomText>
            <CustomText>{user && user.email ? user.email : ""}</CustomText>
          </View>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              marginTop: normalize(40),
              marginBottom: normalize(-70),
            }}
          >
            <Image
              source={
                user
                  ? {
                      uri: user.profile_photo_url,
                    }
                  : null
              }
              style={{
                width: normalize(90),
                height: normalize(80),
                borderRadius: 8,
              }}
            />
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginVertical: normalize(20),
        }}
      >
        <CustomText title="true">Settings</CustomText>
        <View
          style={{
            height: normalize(3),
            backgroundColor: "#757575",
            width: "100%",
            marginTop: normalize(10),
          }}
        ></View>
        <SettingItem to="EditProfile" title="Edit Profile" />
        <SettingItem to="ManageUsers" title="Manage Users" />
        <SettingItem to="HelpAndSupport" title="Help and Support" />
        <SettingItem
          to="Subscription"
          title="Subscription (Free Plan-upto 3 scans)"
        />
        <SettingItem to="PrivacyPolicy" title="Privacy Policy" />
        <SettingItem to="DeleteAccount" title="Delete Account" />
      </View>
      <CustomButton
        title="Logout"
        onPress={() => {
          dispatch(Auth.logout());
          navigation.navigate("Login");
        }}
        style={{ width: normalize(113), marginLeft: normalize(20) }}
      />
    </View>
  );
};

export default Settings;
