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
const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const ForgotPassword = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Continue"
                      style={{ width: "100%" }}
                      //onPress={handleSubmit}
                      onPress={() => navigation.navigate("CodeConfirmation")}
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
    </View>
  );
};

export default ForgotPassword;
