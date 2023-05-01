import React from "react";
import * as Auth from "@store/actions/auth";
import { Alert, ImageBackground, View } from "react-native";
import normalize from "react-native-normalize";
import CustomText from "../../../component/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../constants/colors";
import CustomButton from "../../../component/CustomButton";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import CustomTextInput from "../../../component/CustomTextInput";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Keyboard } from "react-native";
import { ActivityIndicator } from "react-native";
import currencies from "@assets/currencies.json";
import * as ImagePicker from "expo-image-picker";

const ValidationSchema = yup.object().shape({});

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];
const EditProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("US Dollar");
  const [selectedGender, setSelectedGender] = useState("Male");
  const currencyItems = currencies.map((item) => {
    return {
      label: `${item.name} (${item.code})`,
      value: item.name,
    };
  });
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setSelectedCurrency(user.currency ? user.currency : "US Dollar");
      setSelectedGender(user.gender ? user.gender : "Male");
    }
  }, [user]);
  const SubmitHandler = async (values, { resetForm }) => {
    let final = {};
    Object.assign(final, values, {
      currency: selectedCurrency,
      gender: selectedGender,
      profile_photo: {
        uri: image,
        name: "profileImage",
        type: "image/jpeg",
      },
    });
    Keyboard.dismiss();
    action = Auth.updateProfile(final);
    console.log(final);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      navigation.pop(1);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground
        source={require("@assets/home-half-circle.png")}
        style={{
          width: "100%",
          height: normalize(200),
          marginTop: normalize(-30),
        }}
      >
        <View
          style={{
            marginTop: normalize(60),
            width: "90%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginBottom: normalize(10),
              marginTop: normalize(20),
            }}
          >
            <Icon
              name="chevron-left"
              size={normalize(25)}
              color="white"
              onPress={() => navigation.pop(1)}
            />
            <CustomText title="true" style={{ marginLeft: normalize(120) }}>
              Profile
            </CustomText>
          </View>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              marginTop: normalize(20),
              marginBottom: normalize(-70),
            }}
          >
            <Image
              source={
                user
                  ? {
                      uri: image ? image : user.profile_photo_url,
                    }
                  : null
              }
              style={{
                width: normalize(90),
                height: normalize(80),
                borderRadius: 8,
              }}
            />
          </View>
          <Pressable
            style={{
              borderWidth: 3,
              borderColor: "white",
              backgroundColor: colors.primary,
              borderRadius: 30,
              marginLeft: normalize(90),
              marginTop: normalize(30),
              width: normalize(30),
              height: normalize(30),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={pickImage}
          >
            <Icon name="camera" size={20} color="black" />
          </Pressable>
        </View>
      </ImageBackground>
      <View
        style={{
          marginVertical: normalize(10),
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            name: user.name,
            address: user.address,
            pincode: user.pincode,
            city: user.city,
          }}
          onSubmit={(values, { resetForm }) => {
            SubmitHandler(values, { resetForm });
          }}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={CustomTextInput}
                name="name"
                label="Your Name"
                placeholder="Name"
              />
              <Field
                component={CustomTextInput}
                name="address"
                label="Your Address"
                placeholder="Address"
              />
              <Field
                component={CustomTextInput}
                name="city"
                label="Your City"
                placeholder="City"
              />
              <Field
                component={CustomTextInput}
                name="pincode"
                label="Your Postcode"
                placeholder="Postcode"
                keyboardType="number-pad"
              />
              <CustomText>Currency</CustomText>

              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={currencyItems}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                value={selectedCurrency}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedCurrency(item.value);
                  setIsFocus(false);
                }}
              />

              <CustomText>Gender</CustomText>

              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genders}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                value={selectedGender}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedGender(item.value);
                  setIsFocus(false);
                }}
              />
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomButton
                    title="Cancel"
                    style={{
                      marginRight: normalize(10),
                      backgroundColor: "black",
                      borderColor: colors.primary,
                      borderWidth: 3,
                    }}
                    tstyle={{ color: colors.primary }}
                    onPress={() => navigation.pop(1)}
                  />
                  <CustomButton
                    title="Save"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </View>
              )}
            </>
          )}
        </Formik>
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
export default EditProfile;
