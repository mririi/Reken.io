import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "@constants/colors";
import normalize from "react-native-normalize";

const CustomButton = (props) => {
  return (
    <Pressable
      {...props}
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    width: normalize(166),
    height: normalize(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30),
    backgroundColor: colors.button,
  },
  title: {
    color: colors.black,
    fontFamily: "poppins-bold",
    fontWeight: "700",
    fontSize: normalize(14),
  },
});

export default CustomButton;
