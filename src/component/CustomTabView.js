import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../constants/colors";
import normalize from "react-native-normalize";
import CustomText from "./CustomText";

const CustomTabView = ({ expansebymonth, user, currency }) => {
  const [index, setIndex] = useState(0);

  const renderScene = (expansebymonth, index) => {
    const [tab, setTab] = useState(1);

    let obj = expansebymonth.reduce((acc, cur, i) => {
      acc[i + 1] = () => (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
          <ImageBackground
            source={require("@assets/home-half-circle.png")}
            style={{ width: "100%", height: normalize(187), marginTop: -30 }}
          >
            <View
              style={{
                marginTop: normalize(60),
                alignSelf: "center",
              }}
            >
              <CustomText
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                {currency && currency.symbol}
                {tab === 1 ? cur.total_category : cur.merchant_total}
              </CustomText>
              <CustomText style={{ textAlign: "center" }}>
                You spent this month
              </CustomText>
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
                Categories
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
                Merchants
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: normalize(100) }}>
            <FlatList
              data={
                cur
                  ? tab === 1
                    ? cur.category_expanse
                    : cur.merchant_expanse
                  : []
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  key={item.id}
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
                          uri: tab === 1 ? item.cat_img : item.merchant_img,
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
                        {item.name}
                      </CustomText>
                      <CustomText>
                        {(
                          (item.total * 100) /
                          (cur &&
                            (tab === 1
                              ? cur.total_category
                              : cur.merchant_total))
                        ).toFixed(2)}
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
          </View>
        </View>
      );
      return acc;
    }, {});
    return SceneMap(obj);
  };

  const _tabs = () => {
    let routes = expansebymonth.map((m, i) => ({
      key: (i + 1).toString(),
      month: m.month,
    }));
    return (
      <React.Fragment>
        {Array.isArray(expansebymonth) && expansebymonth.length > 0 ? (
          <TabView
            scrollEnabled={true}
            lazy
            renderTabBar={(props) => (
              <TabBar
                scrollEnabled
                tabStyle={{
                  width: 120,
                  backgroundColor: "#0A3713",
                }}
                renderLabel={({ route, color, focused }) => (
                  <View
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 14,
                      minWidth: 110,
                      backgroundColor: focused ? "#23B63E66" : "transparent",
                      borderRadius: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: focused ? "white" : colors.text,
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      {route.month}
                    </Text>
                  </View>
                )}
                {...props}
                style={{ backgroundColor: "#0A3713" }}
              />
            )}
            navigationState={{ index, routes }}
            renderScene={renderScene(expansebymonth, index)}
            onIndexChange={(index) => setIndex(index)}
            initialLayout={{ width: "100%" }}
          />
        ) : null}
      </React.Fragment>
    );
  };

  return <>{_tabs()}</>;
};

export default CustomTabView;
