import React, { useState } from "react";
import ComingSoon from "../ComingSoon";
import { Image, StyleSheet, TextInput, View } from "react-native";
import colors from "../../constants/colors";
import CustomText from "../../component/CustomText";
import normalize from "react-native-normalize";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { useIsFocused } from "@react-navigation/native";
import * as Transactionss from "@store/actions/transactions";
import { useCallback } from "react";
import { useEffect } from "react";
import { FlatList } from "react-native";
import Loading from "../../component/Loading";
import { Pressable } from "react-native";
import { Modal } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../../component/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { startOfMonth, endOfMonth, format } from "date-fns";
const today = new Date();

const Transactions = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState();
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [modalToDate, setModalToDate] = useState("YYYY-MM-DD");
  const [modalFromDate, setModalFromDate] = useState("YYYY-MM-DD");
  const [oldItems, setOldItems] = useState();
  const currency = useSelector((state) => state.auth.currency);
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const merchants = useSelector((state) => state.transactions.merchants);
  const categories = useSelector((state) => state.transactions.categories);
  useEffect(() => {
    if (categories) {
      setCategoryData(
        categories.map((item) => ({ label: item.name, value: item.name }))
      );
    }
  }, [categories]);
  useEffect(() => {
    if (merchants) {
      setMerchantData(
        merchants.map((item) => ({ label: item.name, value: item.name }))
      );
    }
  }, [merchants]);
  const loadCategories = useCallback(async () => {
    try {
      dispatch(Transactionss.list("category"));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  const loadMerchants = useCallback(async () => {
    try {
      dispatch(Transactionss.list("merchant"));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  useEffect(() => {
    loadMerchants();
  }, [loadMerchants]);

  const SumbitHandler = () => {
    setSearch("");
    setSelectedFilter("Today");
    let params = {
      from_date: modalFromDate,
      to_date: modalToDate,
      category_name: selectedCategory,
      merchant_name: selectedMerchant,
    };
    loadTransactions(params);
    setModalVisible(!modalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setModalFromDate(date.toISOString().slice(0, 10));
    hideDatePicker();
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    setModalToDate(date.toISOString().slice(0, 10));
    hideDatePicker1();
  };
  const loadTransactions = useCallback(
    async (params) => {
      try {
        dispatch(Transactionss.transactions(params));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    let params = {
      from_date: fromDate,
      to_date: toDate,
      search: search,
    };
    loadTransactions(params);
  }, [fromDate, toDate]);
  useEffect(() => {
    if (selectedFilter === "Today") {
      setFromDate(new Date().toISOString().slice(0, 10));
      setToDate(new Date().toISOString().slice(0, 10));
    } else if (selectedFilter === "Yesterday") {
      setFromDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10)
      );
      setToDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10)
      );
    } else if (selectedFilter === "Last 7 Days") {
      setFromDate(
        new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .slice(0, 10)
      );
      setToDate(new Date().toISOString().slice(0, 10));
    } else if (selectedFilter === "This Month") {
      const firstDayOfMonth = format(startOfMonth(today), "yyyy-MM-dd");
      const lastDayOfMonth = format(endOfMonth(today), "yyyy-MM-dd");
      setFromDate(new Date(firstDayOfMonth).toISOString().slice(0, 10));
      setToDate(new Date(lastDayOfMonth).toISOString().slice(0, 10));
    } else if (selectedFilter === "Last Month") {
      const firstDayOfMonth = format(
        startOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1))),
        "yyyy-MM-dd"
      );
      const lastDayOfMonth = format(
        endOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1))),
        "yyyy-MM-dd"
      );
      setFromDate(firstDayOfMonth);
      setToDate(lastDayOfMonth);
    }
  }, [selectedFilter]);
  useEffect(() => {
    if (isFocused) {
      loadTransactions({ from_date: fromDate, to_date: toDate });
    }
  }, [isFocused]);
  useEffect(() => {
    if (items && search) {
      const filtered = items.filter((item) =>
        item.merchant_name.toLowerCase().includes(search.toLowerCase())
      );
      setItems(filtered);
    } else {
      let params = {
        from_date: fromDate,
        to_date: toDate,
        search: search,
      };
      loadTransactions(params);
    }
  }, [search]);
  useEffect(() => {
    if (transactions) {
      const nested = transactions.map((item) => item.items);
      setItems(nested.flat(Infinity));
      setOldItems(items);
    }
  }, [transactions]);
  useEffect(() => {
    if (items) {
      const totals = items.map((item) => item.total);
      setTotal(
        totals.length > 1
          ? totals.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )
          : 0
      );
    }
  }, [items]);
  useEffect(() => {
    loadTransactions({ from_date: fromDate, to_date: toDate, search: search });
  }, [loadTransactions]);
  const data = [
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "This Month", value: "This Month" },
    { label: "Last Month", value: "Last Month" },
  ];
  return (
    <>
      {!transactions && <Loading />}
      {transactions && (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
          <View
            style={{
              marginTop: normalize(70),
              marginBottom: normalize(20),
              width: "90%",
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={require("@assets/search.png")} />
              <TextInput
                style={{
                  width: "70%",
                  height: normalize(24),
                  color: colors.text,
                  paddingHorizontal: normalize(10),
                }}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="Search transactions"
                placeholderTextColor={colors.text}
              />
            </View>
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={require("@assets/filter.png")}
                style={{ width: normalize(24), height: normalize(24) }}
              />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: colors.third,
              height: normalize(80),
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                width: "90%",
              }}
            >
              <View>
                <CustomText>You spent</CustomText>
                <CustomText style={{ fontSize: 20, color: "white" }}>
                  {currency && currency.symbol}
                {isNaN(total)?0:total.toFixed(2)}
                </CustomText>
              </View>
              <View>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: colors.primary },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={styles.container}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  value={selectedFilter}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedFilter(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
          </View>

          {items && (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    height: normalize(70),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: normalize(10),
                    borderBottomWidth: 2,
                    borderBottomColor: "#252525",
                  }}
                  onPress={() =>navigation.navigate("FillManually", {screen:"transaction",data:item})}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: normalize(50),
                        height: "100%",
                        borderRadius: 7,
                        marginRight: normalize(10),
                      }}
                    >
                      <Image
                        source={{
                          uri: item.merchant_img,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <View>
                      <CustomText
                        style={{
                          fontWeight: "500",
                          fontSize: normalize(14),
                          color: "white",
                        }}
                      >
                        {item.merchant_name}
                      </CustomText>
                      <CustomText>
                        {((item.total * 100) / (transactions && total)).toFixed(
                          2
                        )}
                        %
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    style={{
                      color: "white",
                      marginTop: normalize(15),
                    }}
                  >
                    {currency && currency.symbol}
                    {item.total?item.total.toFixed(2):0}
                  </CustomText>
                </Pressable>
              )}
            />
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                  <Icon
                    name="close"
                    size={30}
                    color={"white"}
                    style={{ marginRight: normalize(10) }}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                  <CustomText title="true">Filter</CustomText>
                </View>
                <View style={{ width: "100%", marginBottom: normalize(20) }}>
                  <Dropdown
                    style={[
                      { ...styles.dropdown, ...{ width: normalize(320) } },
                      isFocus && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.container}
                    data={merchantData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select item" : "..."}
                    value={selectedMerchant}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setSelectedMerchant(item.value);
                      setIsFocus(false);
                    }}
                  />
                  <Dropdown
                    style={[
                      { ...styles.dropdown, ...{ width: normalize(320) } },

                      isFocus && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.container}
                    data={categoryData}
                    maxHeight={300}
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
                  <View style={{ marginTop: normalize(20) }}>
                    <CustomText>Start Date</CustomText>
                    <Pressable
                      style={{ flexDirection: "row" }}
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
                        value={modalFromDate}
                        editable={false}
                      />
                      <Icon
                        name="calendar"
                        size={normalize(20)}
                        color={colors.text}
                        style={{
                          position: "absolute",
                          right: normalize(10),
                          marginTop: normalize(10),
                        }}
                      />
                    </Pressable>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                  <View style={{ marginTop: normalize(20) }}>
                    <CustomText>End Date</CustomText>

                    <Pressable
                      style={{ flexDirection: "row" }}
                      onPress={showDatePicker1}
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
                        value={modalToDate}
                        editable={false}
                      />
                      <Icon
                        name="calendar"
                        size={normalize(20)}
                        color={colors.text}
                        style={{
                          position: "absolute",
                          right: normalize(10),
                          marginTop: normalize(10),
                        }}
                      />
                    </Pressable>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible1}
                      mode="date"
                      onConfirm={handleConfirm1}
                      onCancel={hideDatePicker1}
                    />
                  </View>
                </View>
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
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                  <CustomButton title="Submit" onPress={SumbitHandler} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    height: "100%",
    backgroundColor: "black",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.primary,
  },
  container: {
    backgroundColor: "white",
    color: "white",
  },
  dropdown: {
    height: normalize(50),
    borderColor: "gray",
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    color: "white",
    width: normalize(120),
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
export default Transactions;
