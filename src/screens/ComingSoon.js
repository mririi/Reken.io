import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import CustomText from "../component/CustomText";

const ComingSoon = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText style={{ fontSize: 28 }}>Coming soon</CustomText>
      <ActivityIndicator color={colors.primary} size={28} />
    </View>
  );
};

export default ComingSoon;
