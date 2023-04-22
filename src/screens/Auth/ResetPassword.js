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
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Keyboard } from "react-native";

const ValidationSchema = yup.object().shape({
  password1: yup.string().required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1")], "Passwords do not match")
    .required("Password is required"),
});
const ResetPassword = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const SubmitHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    action = Auth.resetPassword({
      email: route.params.email,
      password: values.password1,
    });
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.navigate("Login");
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
            Reset password
          </CustomText>
          <CustomText>
            Set the new password for your account so you can login and access
            all the features.
          </CustomText>
        </View>
        <View style={{ marginTop: normalize(30) }}>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{
              password1: "",
              password2: "",
            }}
            onSubmit={(values, { resetForm }) => {
              SubmitHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomTextInput}
                  name="password1"
                  label="New Password"
                  placeholder="New Password"
                  isPassword={true}
                />
                <Field
                  component={CustomTextInput}
                  name="password2"
                  isPassword={true}
                  label="Confirm Password"
                  placeholder="Confirm Password"
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
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default ResetPassword;
