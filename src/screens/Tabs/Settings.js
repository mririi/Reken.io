import React from "react";
import ComingSoon from "../ComingSoon";
import CustomText from "../../component/CustomText";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import * as Auth from "@store/actions/auth";
const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <CustomText
        onPress={() => {
          dispatch(Auth.logout());
          navigation.navigate("Login");
        }}
      >
        Logout
      </CustomText>
    </View>
  );
};

export default Settings;
