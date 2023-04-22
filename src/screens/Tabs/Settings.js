import React from "react";
import ComingSoon from "../ComingSoon";
import CustomText from "../../component/CustomText";
import { View } from "react-native";

const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomText onPress={() => navigation.navigate("Login")}>
        Logout
      </CustomText>
    </View>
  );
};

export default Settings;
