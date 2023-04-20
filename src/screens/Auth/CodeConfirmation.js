import React, { useState } from "react";
import colors from "../../constants/colors";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import CustomText from "../../component/CustomText";
import CustomTextInput from "../../component/CustomTextInput";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import CustomButton from "../../component/CustomButton";
const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginBottom: normalize(50) },
  cell: {
    width: normalize(40),
    height: normalize(50),
    lineHeight: normalize(38),
    fontSize: normalize(24),
    borderBottomWidth: 3,
    borderColor: colors.text,
    textAlign: "center",
    color: "white",
  },
  focusCell: {
    borderColor: colors.primary,
  },
});
const CELL_COUNT = 6;

const CodeConfirmation = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View
        style={{ marginTop: normalize(50), width: "90%", alignSelf: "center" }}
      >
        <Icon
          name="left"
          color={colors.title}
          size={normalize(25)}
          onPress={() => {
            navigation.pop(1);
          }}
        />
        <View style={{ marginVertical: normalize(20) }}>
          <CustomText
            title={true}
            style={{
              width: normalize(180),
              fontSize: normalize(34),
              marginBottom: normalize(10),
            }}
          >
            Enter 6 digits code
          </CustomText>
          <CustomText>
            Enter the 6 digits code that you received an your email.
          </CustomText>
        </View>
        <View style={{ marginTop: normalize(30) }}>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { resetForm }) => {
              LoginHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Reset Password"
                      style={{ width: "100%" }}
                      //   onPress={handleSubmit}
                      onPress={() => {
                        navigation.navigate("ResetPassword");
                      }}
                      disabled={!isValid}
                    />
                  </>
                )}
              </>
            )}
          </Formik>
          <View
            style={{
              alignSelf: "center",
              marginTop: normalize(20),
            }}
          >
            <CustomText style={{ color: colors.primary }} onPress={() => {}}>
              Resend code!
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CodeConfirmation;
