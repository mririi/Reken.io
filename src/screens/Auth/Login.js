import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, Keyboard, View } from "react-native";
import CustomText from "../../component/CustomText";
import CustomTextInput from "../../component/CustomTextInput";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import CustomButton from "../../component/CustomButton";
import * as Auth from "@store/actions/auth";
import Toast from "react-native-toast-message";
const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Login = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const LoginHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    action = Auth.login(values);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (err) {
      setError("Invalid credentials");
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
        <View style={{ width: normalize(180), marginVertical: normalize(20) }}>
          <CustomText
            title={true}
            style={{ fontSize: normalize(34), marginBottom: normalize(10) }}
          >
            Welcome back!
          </CustomText>
          <CustomText>Hey! Good to see you again.</CustomText>
        </View>
        <View style={{ marginTop: normalize(30) }}>
          <Formik
            validationSchema={signInValidationSchema}
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
                <Field
                  component={CustomTextInput}
                  name="email"
                  label="Your Email"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomTextInput}
                  name="password"
                  label="Password"
                  isPassword={true}
                  placeholder="Password"
                  secureTextEntry
                />
                <CustomText
                  style={{
                    color: colors.primary,
                    marginBottom: normalize(20),
                  }}
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  Forgot Password?
                </CustomText>
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Sign In"
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
            <CustomText>New User? </CustomText>
            <CustomText
              style={{ color: colors.primary }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Create Account
            </CustomText>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default Login;
