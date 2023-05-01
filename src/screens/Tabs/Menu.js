import React from "react";
import { Image, View } from "react-native";
import normalize from "react-native-normalize";
import CustomText from "../../component/CustomText";
import colors from "../../constants/colors";
import { Pressable } from "react-native";

const Menu = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: normalize(100),
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "95%",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("@assets/camera-icon.png")} />

          <CustomText>Capture Reciept</CustomText>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("@assets/image-icon.png")} />
          <CustomText>Gallery</CustomText>
        </View>
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("FillManually")}
        >
          <Image source={require("@assets/keyboard-icon.png")} />

          <CustomText style={{ color: colors.primary }}>
            Fill Manually
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default Menu;
