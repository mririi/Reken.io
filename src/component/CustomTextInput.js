import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import normalize from "react-native-normalize";
import colors from "@constants/colors";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/Feather";

const CustomTextInput = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  return (
    <View style={{ marginBottom: normalize(15, "height") }}>
      <CustomText>{props.label}</CustomText>
      <View style={styles.container}>
        <TextInput
          {...inputProps}
          style={{ ...styles.input, ...props.style }}
          placeholderTextColor={colors.text}
          secureTextEntry={props.isPassword ? passwordVisible : false}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
        />
        {props.isPassword && passwordVisible && (
          <Icon
            name="eye"
            size={normalize(20)}
            color={colors.text}
            style={{ position: "absolute", right: normalize(10) }}
            onPress={() => setPasswordVisible(false)}
          />
        )}
        {props.isPassword && !passwordVisible && (
          <Icon
            name="eye-off"
            size={normalize(20)}
            color={colors.text}
            style={{ position: "absolute", right: normalize(10) }}
            onPress={() => setPasswordVisible(true)}
          />
        )}
      </View>
      {errors[name] && touched[name] && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    borderBottomWidth: 3,
    borderColor: "white",
    marginBottom: normalize(10),
  },
  input: {
    marginLeft: 10,
    width: "100%",
    height: 50,
    fontWeight: "500",
    color: "white",
    fontSize: 18,
    backgroundColor: "black",
  },
  errorContainer: {
    marginTop: 3,
  },
  errorText: {
    fontSize: 14,
    color: "#D24141",
  },
});
export default CustomTextInput;
