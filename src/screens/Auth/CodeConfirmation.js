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
import * as Auth from "@store/actions/auth";
const ValidationSchema = yup.object().shape({});
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Keyboard } from "react-native";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  root: { padding: 10, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30 },
  codeFiledRoot: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: normalize(20),
  },
  cellRoot: {
    width: normalize(40),
    height: normalize(50),
    lineHeight: normalize(38),
    fontSize: normalize(24),
    borderBottomWidth: 3,
    borderColor: colors.text,
    textAlign: "center",
    color: "white",
  },
  cellText: {
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
});

const CELL_COUNT = 6;

const CodeConfirmation = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const SubmitHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    action = Auth.verifyCode({ email: route.params.email, value });
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.navigate("ResetPassword", { email: route.params.email });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const ResendHandler = async () => {
    action = Auth.resendVerification(route.params.email);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      Toast.show({
        type: "success",
        text1: "Done!",
        text2: "Code has been sent!",
        visibilityTime: 6000,
        autoHide: true,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
        text2: "Check your informations",
        visibilityTime: 6000,
        autoHide: true,
      });
    }
  }, [error]);
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
              value: "",
            }}
            onSubmit={(values, { resetForm }) => {
              SubmitHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={[styles.cellRoot, isFocused && styles.focusCell]}
                    >
                      <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />

                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Reset Password"
                      style={{ width: "100%" }}
                      onPress={handleSubmit}
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
            <CustomText
              style={{ color: colors.primary }}
              onPress={ResendHandler}
            >
              Resend code!
            </CustomText>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default CodeConfirmation;
