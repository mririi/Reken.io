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
import { Text } from "react-native";
import { Modal } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../../component/CustomButton";

const Transactions = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState();
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const currency = useSelector((state) => state.auth.currency);
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  console.log(transactions);
  const loadTransactions = useCallback(async () => {
    try {
      let params = {};
      if (selectedFilter === "Today") {
        params = {
          from_date: new Date().toISOString().slice(0, 10),
          to_date: new Date().toISOString().slice(0, 10),
        };
      } else if (selectedFilter === "Yesterday") {
        params = {
          from_date: new Date(new Date().setDate(new Date().getDate() - 1))
            .toISOString()
            .slice(0, 10),
          to_date: new Date(new Date().setDate(new Date().getDate() - 1))
            .toISOString()
            .slice(0, 10),
        };
      }
      console.log(params);
      dispatch(Transactionss.transactions(params));
      if (transactions) {
        const nested = transactions.map((item) => item.items);
        setItems(nested.length > 1 ? nested.flat(Infinity) : nested[0]);
        console.log(nested);
        console.log(items);
        const totals = items.map((item) => item.total);
        console.log(totals);
        setTotal(
          totals.length > 1
            ? totals.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
            : totals
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, selectedFilter]);
  useEffect(() => {
    if (isFocused) {
      loadTransactions();
    }
  }, [isFocused]);
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions, selectedFilter]);
  console.log(total);
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
                  {total}
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

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
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
                  {item.total}
                </CustomText>
              </View>
            )}
          />

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
                  />
                  <CustomButton title="Submit" />
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
    backgroundColor: colors.third,
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
