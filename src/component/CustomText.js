import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "@constants/colors";
import normalize from "react-native-normalize";

const CustomText = (props) => {
  return (
    <Text
      {...props}
      style={
        props.title
          ? { ...styles.title, ...props.style }
          : { ...styles.text, ...props.style }
      }
    >
      {props.children}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontFamily: "poppins-regular",
    fontWeight: "400",
    fontSize: 14,
  },
  title: {
    color: colors.title,
    fontFamily: "poppins-bold",
    fontWeight: "700",
    fontSize: 20,
  },
});
export default CustomText;
