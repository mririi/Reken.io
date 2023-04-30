import React from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator color={colors.primary} size={28} />
    </View>
  );
};

export default Loading;
