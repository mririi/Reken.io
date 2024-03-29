import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, Keyboard, StyleSheet, View } from "react-native";
import CustomText from "../../component/CustomText";
import CustomTextInput from "../../component/CustomTextInput";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import CustomButton from "../../component/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import * as Auth from "@store/actions/auth";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const data = [
  { label: "US Dollar", value: "USD" },
  { label: "EURO", value: "EURO" },
];
const Register = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("USD");
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const SignUpHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    action = Auth.signup(values);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.navigate("BottomTabsNavigation");
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
    <KeyboardAwareScrollView style={{ backgroundColor: "black", flex: 1 }}>
      <View
        style={{
          marginTop: normalize(50),
          width: "90%",
          alignSelf: "center",
        }}
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
            Create account
          </CustomText>
          <CustomText>We are happy to see you here!</CustomText>
        </View>
        <View style={{ marginTop: normalize(30) }}>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
              currency: "USD",
            }}
            onSubmit={(values, { resetForm }) => {
              SignUpHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomTextInput}
                  name="name"
                  label="Your name"
                  placeholder="Your name"
                />
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
                <CustomText>Currency</CustomText>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: colors.primary },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <CustomButton
                      title="Sign Up"
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
            <CustomText>Have account? </CustomText>
            <CustomText
              style={{ color: colors.primary }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Sign In
            </CustomText>
          </View>
        </View>
      </View>
      <Toast />
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 16,
  },
  dropdown: {
    height: normalize(50),
    borderColor: "gray",
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    color: "white",
    marginBottom: normalize(20),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: normalize(22),
    top: normalize(8),
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: normalize(14),
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default Register;
