import React, { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import CustomText from "../../../component/CustomText";
import { Image } from "react-native";
import colors from "../../../constants/colors";
import CustomButton from "../../../component/CustomButton";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Purchases from 'react-native-purchases';

const APIKeys = {
  apple: "appl_ZivZqzCrMtILvpgYiIsebsKSTfC",
  google: "goog_wydwRUfOiUuHQCoWRNqXgOadzwV",
};

const Subscription = ({ navigation }) => {
  const [selected, setSelected] = useState(1);
  const [prod,setProd]=useState()
  const [priceMonthly,setPriceMonthly]=useState("0")
  const [priceYearly,setPriceYearly]=useState("0")
  useEffect(() => {
    const main = async () => {
      Purchases.setDebugLogsEnabled(true);

      await Purchases.configure({apiKey:Platform.OS==="ios"?APIKeys.apple:APIKeys.google})
      const prods = await Purchases.getProducts(["yearly","monthly"])
      setPriceMonthly(prods[0].price)
      setPriceYearly(prods[1].price)
      setProd(prods)
    }
    main()
  },[]);
  const purchaseProduct = async () => {
    try{
      const product = selected===1?prod[0].identifier:prod[1].identifier
     const purchaseMade = await Purchases.purchaseProduct(product)
    }catch(e){
      console.log(e)
    }
  }
  return (
  <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          paddingVertical: normalize(40),
          width: "90%",
          alignSelf: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon
            name="left"
            size={normalize(25)}
            color="white"
            onPress={() => navigation.pop(1)}
          />
          <CustomText title="true" style={{ marginLeft: normalize(100) }}>
            Tariff Plan
          </CustomText>
        </View>
        <Image
          source={require("@assets/subscribe.png")}
          style={{ alignSelf: "center", marginTop: normalize(20) }}
        />
        <View style={{ marginTop: normalize(-30) }}>
          <Pressable
            style={
              selected === 1
                ? { ...styles.selected, ...{ marginBottom: -40 } }
                : { ...styles.notSelected, ...{ marginBottom: -40 } }
            }
            onPress={() => setSelected(1)}
          >
            <Image
              source={
                selected === 1
                  ? require("@assets/calender.png")
                  : require("@assets/calender-notselected.png")
              }
              style={{ width: normalize(38), height: normalize(40) }}
            />
            <CustomText
              title="true"
              style={{ color: selected === 1 ? "black" : "#AAAAAA" }}
            >
              
              <CustomText
                title="true"
                style={{
                  color: selected === 1 ? "black" : "#AAAAAA",
                  fontWeight: "800",
                  fontSize: 34,
                }}
              >
                {priceMonthly}
              </CustomText>
            </CustomText>
            <CustomText style={{ color: selected === 1 ? "black" : "#AAAAAA" }}>
              Upto 100 scans / month
            </CustomText>
          </Pressable>
          <Pressable
            style={selected === 2 ? styles.selected : styles.notSelected}
            onPress={() =>
              setSelected(2)}
          >
            <Image
              source={
                selected === 1
                  ? require("@assets/calender-year.png")
                  : require("@assets/calender-year-notselected.png")
              }
              style={{ width: normalize(50), height: normalize(48) }}
            />
            <CustomText
              title="true"
              style={{ color: selected === 2 ? "black" : "#AAAAAA" }}
            >
              
              <CustomText
                title="true"
                style={{
                  color: selected === 2 ? "black" : "#AAAAAA",
                  fontWeight: "800",
                  fontSize: 34,
                }}
              >
                {priceYearly}
              </CustomText>
            </CustomText>
            <CustomText style={{ color: selected === 2 ? "black" : "#AAAAAA" }}>
              Upto 1300 scans / Year
            </CustomText>
          </Pressable>
        </View>
        <CustomText
          style={{
            marginTop: normalize(20),
            textAlign: "center",
            color: "white",
            width: "80%",
            alignSelf: "center",
          }}
        >
          Choose a tariff plan and confirm your subscription. All plans are auto
          renewable plans.
        </CustomText>
        <CustomButton
          title="Subscribe"
          onPress={() => purchaseProduct()}
          style={{ width: "100%", marginTop: normalize(20) }}
        />
      </View>
  </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  selected: {
    position: "relative",
    zIndex: 3,
    width: "100%",
    height: normalize(155),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
  },
  notSelected: {
    position: "relative",
    zIndex: 2,
    width: "80%",
    alignSelf: "center",
    height: normalize(195),
    backgroundColor: colors.third,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
  },
});
export default Subscription;

