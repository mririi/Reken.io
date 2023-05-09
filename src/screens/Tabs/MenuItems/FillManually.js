import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import colors from "../../../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import normalize from "react-native-normalize";
import CustomText from "../../../component/CustomText";
import * as Transactions from "@store/actions/transactions";
import * as yup from "yup";
import { Field, Formik } from "formik";
import CustomTextInput from "../../../component/CustomTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../component/CustomButton";

const ValidationSchema = yup.object().shape({});
const FillManually = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Groceries");
  const [selectedMethod, setSelectedMethod] = useState("Debit Card");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("YYYY-MM-DD");
  const [isFocus, setIsFocus] = useState();
  const [isFocus1, setIsFocus1] = useState();
  const [categoryDropdown, setCategoryDropdown] = useState([]);
  const categories = useSelector((state) => state.transactions.categories);
  const methodDropdown = [{ label: "Debit Card", value: "Debit Card" }];
  useEffect(() => {
    if (categories) {
      setCategoryDropdown(
        categories.map((item) => ({ label: item.name, value: item.name }))
      );
    }
  }, [categories]);
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date.toISOString().slice(0, 10));
    hideDatePicker();
  };
  const SubmitHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    let final = {};
    Object.assign(final, values, {
      expanse_date: date,
      category: selectedCategory,
    });
    action = Transactions.addExpense(values);
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
  const loadCategories = useCallback(async () => {
    try {
      dispatch(Transactions.list("category"));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  console.log(categories);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingVertical: normalize(50),
      }}
    >
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          name: "",
          itemname: "",
          qte: "",
          price: "",
          total: "",
          tax: "",
          paymentdetails: "",
          address: "",
        }}
        onSubmit={(values, { resetForm }) => {
          SubmitHandler(values, { resetForm });
        }}
      >
        {({ handleSubmit, isValid, initialValues }) => (
          <>
            <Icon
              style={{ marginLeft: normalize(10) }}
              name="left"
              size={normalize(25)}
              color="white"
              onPress={() => navigation.pop(1)}
            />
            <ScrollView>
              <View style={{ width: "95%", alignSelf: "center" }}>
                <CustomText
                  title="true"
                  style={{ marginVertical: normalize(25) }}
                >
                  Add Expense
                </CustomText>
                <Field
                  component={CustomTextInput}
                  name="name"
                  label="Merchant Name"
                  placeholder="Name"
                />
                <View style={{ marginBottom: normalize(10) }}>
                  <CustomText>Start Date</CustomText>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={{ width: "100%" }}
                      onPress={showDatePicker}
                    >
                      <TextInput
                        style={{
                          borderColor: "#AAAAAA",
                          borderBottomWidth: 3,
                          height: normalize(40),
                          width: "100%",
                          color: "white",
                          paddingHorizontal: normalize(10),
                        }}
                        value={date}
                        editable={false}
                      />
                    </Pressable>
                    <Icon
                      name="calendar"
                      size={normalize(20)}
                      color={colors.text}
                      style={{
                        position: "absolute",
                        right: normalize(10),
                        marginTop: normalize(10),
                      }}
                      onPress={showDatePicker}
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
                <CustomText style={{ marginTop: normalize(20) }}>
                  Categories
                </CustomText>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categoryDropdown}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  value={selectedCategory}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedCategory(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#252525",
                  marginTop: normalize(20),
                  width: "100%",
                }}
              >
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <CustomText
                    title="true"
                    style={{ marginVertical: normalize(20) }}
                  >
                    Items
                  </CustomText>
                  <Field
                    component={CustomTextInput}
                    name="itemname"
                    label="Item Name"
                    placeholder="Name"
                    style={{ backgroundColor: "#252525" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "40%" }}>
                      <Field
                        component={CustomTextInput}
                        name="qte"
                        label="Quantity"
                        placeholder="0"
                        keyboardType="numeric"
                        style={{ backgroundColor: "#252525" }}
                      />
                    </View>
                    <View style={{ width: "40%" }}>
                      <Field
                        component={CustomTextInput}
                        name="price"
                        label="Price"
                        placeholder="0.00"
                        style={{ backgroundColor: "#252525" }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "40%" }}>
                      <Field
                        component={CustomTextInput}
                        name="total"
                        label="Total"
                        placeholder="0.00"
                        style={{ backgroundColor: "#252525" }}
                      />
                    </View>
                    <CustomButton
                      title="Add Item"
                      style={{ marginTop: normalize(15) }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "95%",
                  marginTop: normalize(10),
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <Field
                      component={CustomTextInput}
                      name="tax"
                      label="Tax"
                      placeholder="0"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={methodDropdown}
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "Select item" : "..."}
                      value={selectedMethod}
                      onFocus={() => setIsFocus1(true)}
                      onBlur={() => setIsFocus1(false)}
                      onChange={(item) => {
                        setSelectedMethod(item.value);
                        setIsFocus1(false);
                      }}
                    />
                  </View>
                </View>
                <Field
                  component={CustomTextInput}
                  name="paymentdetails"
                  label="Payment Details"
                  placeholder="Last 4 digits of card number"
                />
                <Field
                  component={CustomTextInput}
                  name="address"
                  label="Address"
                  placeholder="Address"
                />
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
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
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
    marginTop: normalize(10),
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
export default FillManually;
