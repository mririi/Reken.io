import React, { useState } from "react";
import colors from "../../constants/colors";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, View } from "react-native";
import CustomText from "../../component/CustomText";
import CustomTextInput from "../../component/CustomTextInput";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import CustomButton from "../../component/CustomButton";
import * as Auth from "@store/actions/auth";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { Keyboard } from "react-native";

const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
});
const ForgotPassword = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const SubmitHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    action = Auth.forgetPassword(values.email);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.navigate("CodeConfirmation", { email: values.email });
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
              fontSize: normalize(34),
              width: normalize(200),
              marginBottom: normalize(10),
            }}
          >
            Forgot password
          </CustomText>
          <CustomText style={{ width: normalize(280) }}>
            Enter your email for the verification process, we will send 6 digits
            code on your email.
          </CustomText>
        </View>
        <View style={{ marginTop: normalize(10) }}>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{
              email: "",
            }}
            onSubmit={(values, { resetForm }) => {
              SubmitHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomTextInput}
                  name="email"
                  label="Your Email"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Continue"
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
              flexDirection: "row",
              marginTop: normalize(20),
            }}
          >
            <CustomText>Don't have an account? </CustomText>
            <CustomText
              style={{ color: colors.primary }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Sign Up
            </CustomText>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default ForgotPassword;
