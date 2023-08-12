import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import colors from "../../../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import normalize from "react-native-normalize";
import CustomText from "../../../component/CustomText";
import * as Transactions from "@store/actions/transactions";
import * as yup from "yup";
import { Field, Formik, setIn } from "formik";
import CustomTextInput from "../../../component/CustomTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../component/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

const ValidationSchema = yup.object().shape({
  paymentdetails: yup
    .number()
    .required("Payment Details Field is required"),
});
const FillManually = ({ route,navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Groceries");
  const [selectedMethod, setSelectedMethod] = useState("Debit Card");
  const [inputs, setInputs] = useState([
    { name: "",price:"",quantity:""},
  ]);
  const [total, setTotal] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("YYYY-MM-DD");
  const [isFocus, setIsFocus] = useState();
  const [isFocus1, setIsFocus1] = useState();
  const [categoryDropdown, setCategoryDropdown] = useState([]);
  const categories = useSelector((state) => state.transactions.categories);
  const methodDropdown = [{ label: "Debit Card", value: "Debit Card" }];
  useEffect(() => {
    if (route.params?.data){
      console.log(route.params.data)
      if (route.params.screen === "details") {
        setInputs(convertFromDetails(route.params.data.items))
      }
      if(route.params.screen==="transaction"){
        setSelectedCategory(route?.params?.data?.category_name)
        setDate(route?.params?.data?.expance_date.slice(0, 10))
      }
    }
  },[route]);
  const convertFromDetails = (originalData) => {
    const convertedData = originalData.map((obj) => ({
      name: obj["valueObject"]?.Name?.text || "",
      price: obj["valueObject"]?.TotalPrice?.valueNumber || 0,
      quantity: obj["valueObject"]?.Quantity?.valueNumber || 0
    }));
    return convertedData;
  };
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
  useEffect(()=>{
    if(inputs){
      const tot= inputs.reduce((acc, item) => {
        if(item.quantity && item.price){
          return acc + item.quantity * item.price;
        }else return acc
      }, 0);
      setTotal(tot)
    }
  },[inputs])

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
    let addedValues = {
      expanse_date: date,
      category: selectedCategory,
      items:inputs,
      total:total,
    }
    if (route.params?.screen ==="transaction"){
      addedValues["id"]=route.params?.data?.id
    }
    Object.assign(final, values, addedValues);
    
    if(route.params?.screen==="transaction"){
      action = Transactions.editExpense(final);
    }else{
      action = Transactions.addExpense(final);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      resetForm({ values: "" });
      setIsLoading(false);
      if(route.params?.screen==="transaction"){
        navigation.pop(1);
      }else{
        navigation.pop(2);
      }
    } catch (err) {
      setError("Invalid credentials");
      console.log(err);
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

  const handleInputChange = (text, index, key) => {
    const newInputs = [...inputs];
    newInputs[index][key] = text;
    setInputs(newInputs);
  };

  const handleAddInput = (index) => {
    const newInputs = [...inputs, { name: "", email: "" }];
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
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
          name: route?.params?.screen=== "details"?route.params?.data?.name : route.params?.data?.merchant_name,
          tax: route.params?.data?.tax || "0",
          paymentdetails: "",
          address: route.params?.data?.address || ""
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
            <KeyboardAwareScrollView>
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
                {inputs.map((input, index) => (
                  <View
                    style={{ width: "95%", alignSelf: "center",paddingVertical:normalize(20) }}
                    key={index}
                  >
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <CustomText
                      title="true"
                      style={{ marginVertical: normalize(20) }}
                    >
                      Items
                    </CustomText>
                    {index > 0 && ( <Icon name="close" color={"red"} size={normalize(25)}  onPress={() => handleRemoveInput(index)}/>)}
                    </View>
                    <CustomText>Name</CustomText>
                    <View style={styles.containerInput}>
                    <TextInput
                                              placeholderTextColor={colors.text}
                      placeholder="Name"
                      value={input.name}
                      onChangeText={(text) =>
                        handleInputChange(text, index, "name")
                      }
                      style={styles.input}
                    />
                      </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "40%" }}>
                      <CustomText>Quantity</CustomText>
                      <View style={styles.containerInput}>

                        <TextInput
                          value={input?.quantity?.toString()}
                          onChangeText={(text) =>
                            handleInputChange(text, index, "quantity")
                          }
                          keyboardType="numeric"
                          style={styles.input}
                          placeholder="0"
                          placeholderTextColor={colors.text}
                        />
                      </View>
                      </View>
                      <View style={{ width: "40%" }}>
                      <CustomText>Price</CustomText>
                      <View style={styles.containerInput}>
                        <TextInput
                          value={input?.price?.toString()}
                          onChangeText={(text) =>
                            handleInputChange(text, index, "price")
                          }
                          style={styles.input}
                          keyboardType="numeric"
                          placeholder="0"
                          placeholderTextColor={colors.text}
                        />
                      </View>
                    </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {index===inputs.length-1 &&<View style={{ width: "40%" }}>
                      <CustomText>Total</CustomText>
                       <View style={styles.containerInput}>
                      
                        <TextInput
                        editable={false}
                          value={total.toString()}
                          keyboardType="numeric"
                          style={styles.input}
                        />
                      </View>
                      </View>}
                      {index===inputs.length-1 && <CustomButton
                        title="Add Item"
                        style={{ marginTop: normalize(15) }}
                        onPress={handleAddInput}
                      />}
                    </View>
                  </View>
                ))}
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
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                  <CustomText>Payment Method</CustomText>

                    <Dropdown
                      style={{...styles.dropdown,...{marginTop:-10}}}
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
                  keyboardType="numeric"
                  maxLength={4}
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
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
      <Toast />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 16,
  },
  containerInput:{
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#AAAAAA",
    marginBottom: normalize(10),
    backgroundColor: "#252525"
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
  input: {
    marginLeft: 10,
    width: "100%",
    height: 50,
    fontWeight: "500",
    color: "white",
    fontSize: 18,
    backgroundColor: "#252525"
  },
});

export default FillManually;
