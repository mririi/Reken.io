import React, { useState } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import CustomText from "../component/CustomText";
import CustomButton from "../component/CustomButton";
const GetStartedScreen = ({ navigation }) => {
  const [index, setIndex] = useState(1);
  const IntroScreen = (props) => {
    const { image, title, text, last } = props;
    return (
      <ImageBackground
        source={require("@assets/bg.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={image}
          style={{
            marginTop: normalize(40),
            width: "100%",
            height: "60%",
          }}
          resizeMode="contain"
        />
        <View
          style={{
            position: "absolute",
            bottom: normalize(145),
            left: normalize(30),
            maxWidth: normalize(192),
          }}
        >
          <CustomText title={true}>{title}</CustomText>
          <CustomText>{text}</CustomText>
        </View>
        {!last && (
          <>
            <View
              style={{
                position: "absolute",
                bottom: normalize(60),
                height: normalize(5),
                width: "50%",
                backgroundColor: colors.button,
              }}
            ></View>
            <TouchableOpacity
              onPress={() => setIndex((prevState) => prevState + 1)}
              style={{
                position: "absolute",
                bottom: normalize(40),
                right: normalize(31),
                backgroundColor: colors.button,
                height: normalize(50),
                width: normalize(50),
                borderRadius: normalize(50),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="arrowright"
                size={normalize(30)}
                color={colors.black}
              />
            </TouchableOpacity>
          </>
        )}
        {last && (
          <CustomButton
            title="Start Manage"
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{
              position: "absolute",
              bottom: normalize(40),
              right: normalize(-30),
            }}
          />
        )}
      </ImageBackground>
    );
  };
  return (
    <>
      {index === 1 && (
        <IntroScreen
          image={require("@assets/intro1.png")}
          title="Scan reciepts/bills"
          text="Keeping track of your digital receipts is as simple as scanning them in."
        />
      )}
      {index === 2 && (
        <IntroScreen
          image={require("@assets/intro2.png")}
          title="Smart reken.io"
          text="Reken.io is an intelligent platform with an integrated AI system."
        />
      )}
      {index === 3 && (
        <IntroScreen
          image={require("@assets/intro3.png")}
          title="Track your bills"
          text="Monthly, by category, and with various sellers, It’s simple to keep track on your expenses."
          last={true}
        />
      )}
    </>
  );
};

export default GetStartedScreen;
