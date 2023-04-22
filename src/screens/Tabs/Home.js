import React from "react";
import { Text, View } from "react-native";
import ComingSoon from "../ComingSoon";
import colors from "../../constants/colors";
import { TouchableOpacity } from "react-native";
import CustomText from "../../component/CustomText";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import normalize from "react-native-normalize";
import { ImageBackground } from "react-native";
const Home = () => {
  const [tab, setTab] = useState(1);
  const user = useSelector((state) => state.auth.user);
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ImageBackground
        source={require("@assets/home-half-circle.png")}
        style={{ width: normalize(360), height: normalize(187) }}
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
              {user.name ?? "No name available"}
            </CustomText>
            <CustomText>Spent </CustomText>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              width: normalize(50),
              height: normalize(50),
              borderRadius: 10,
            }}
          >
            <Image source={{ uri: user.profile_photo_url }} />
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
    </View>
  );
};

export default Home;
