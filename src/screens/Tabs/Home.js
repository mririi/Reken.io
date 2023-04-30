import React from "react";
import { View } from "react-native";
import colors from "../../constants/colors";
import { TouchableOpacity } from "react-native";
import CustomText from "../../component/CustomText";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import normalize from "react-native-normalize";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import * as Transactions from "@store/actions/transactions";
import { useCallback } from "react";
import { FlatList } from "react-native";
import CustomPie from "../../component/CustomPie";
import Loading from "../../component/Loading";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [numbers, setNumbers] = useState();
  const [data, setData] = useState();
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.auth.currency);

  const currentmonthexpanse = useSelector(
    (state) => state.transactions.currentmonthexpanse
  );
  const isFocused = useIsFocused();

  const thecolors = [
    "#EFDD37",
    "#54D1E2",
    "#FACC88",
    "#5BC86F",
    "#EFDD37",
    "#54D1E2",
    "#FACC88",
    "#5BC86F",
    "#EFDD37",
    "#54D1E2",
    "#FACC88",
    "#5BC86F",
    "#EFDD37",
    "#54D1E2",
    "#FACC88",
    "#5BC86F",
  ];
  useEffect(() => {
    if (currentmonthexpanse) {
      setData(
        currentmonthexpanse
          ? tab === 1
            ? currentmonthexpanse.category_thismonth
            : currentmonthexpanse.category_today
          : []
      );
    }
  }, [currentmonthexpanse, tab]);
  useEffect(() => {
    if (data) {
      const total = currentmonthexpanse
        ? tab === 1
          ? currentmonthexpanse.total_thismonth
          : currentmonthexpanse.total_today
        : [];

      setNumbers(
        Object.keys(data).map((key) => ({
          x: ((data[key].total * 100) / total).toFixed(1),
          y: ((data[key].total * 100) / total).toFixed(1),
        }))
      );
    }
  }, [data, tab, currentmonthexpanse]);

  const dispatch = useDispatch();
  const loadCurrentMonthExpanse = useCallback(async () => {
    try {
      if (user) {
        dispatch(Transactions.currentMonthExpense(user.id));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (isFocused) {
      loadCurrentMonthExpanse();
      console.log("Home is focused");
    }
  }, [isFocused]);
  useEffect(() => {
    loadCurrentMonthExpanse();
  }, [loadCurrentMonthExpanse]);
  return (
    <>
      {!currentmonthexpanse && <Loading />}
      {currentmonthexpanse && (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
          <ImageBackground
            source={require("@assets/home-half-circle.png")}
            style={{ width: "100%", height: normalize(187) }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(60),
                width: "90%",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <CustomText title="true">
                  {user && user.name ? user.name : "No name available"}
                </CustomText>
                <CustomText>
                  Spent {currency && currency.symbol}
                  {tab === 1
                    ? currentmonthexpanse && currentmonthexpanse.total_thismonth
                    : currentmonthexpanse && currentmonthexpanse.total_today}
                </CustomText>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                <Image
                  source={
                    user
                      ? {
                          uri: user.profile_photo_url,
                        }
                      : null
                  }
                  style={{
                    width: normalize(50),
                    height: normalize(50),
                  }}
                />
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              backgroundColor: colors.black,
              flexDirection: "row",
              width: "50%",
              height: normalize(60),
              alignSelf: "center",
              borderRadius: 40,
              padding: normalize(10),
              marginTop: normalize(-30),
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: tab === 1 ? colors.primary : "transparent",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                height: "100%",
              }}
              onPress={() => setTab(1)}
            >
              <CustomText
                style={{
                  color: tab === 1 ? "black" : colors.text,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                This Month
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: tab === 2 ? colors.primary : "transparent",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                height: "100%",
              }}
              onPress={() => setTab(2)}
            >
              <CustomText
                style={{
                  color: tab === 2 ? "black" : colors.text,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                Today
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: normalize(5) }}>
            <CustomPie data={numbers} colors={thecolors} />

            <FlatList
              data={
                currentmonthexpanse
                  ? tab === 1
                    ? currentmonthexpanse.category_thismonth
                    : currentmonthexpanse.category_today
                  : []
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
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
                        width: normalize(20),
                        height: "100%",
                        borderRadius: 7,
                        backgroundColor: thecolors[index],
                        marginRight: normalize(10),
                      }}
                    ></View>
                    <CustomText
                      style={{
                        fontWeight: "500",
                        fontSize: normalize(14),
                        color: "white",
                      }}
                    >
                      {item.category_name}
                    </CustomText>
                  </View>
                  <CustomText>
                    {(
                      (item.total * 100) /
                      (tab === 1
                        ? currentmonthexpanse &&
                          currentmonthexpanse.total_thismonth
                        : currentmonthexpanse &&
                          currentmonthexpanse.total_today)
                    ).toFixed(2)}{" "}
                    %
                  </CustomText>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Home;
