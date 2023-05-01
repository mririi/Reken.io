import React, { useState } from "react";
import ComingSoon from "../../ComingSoon";
import { View } from "react-native";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/AntDesign";
import CustomText from "../../../component/CustomText";
import CustomButton from "../../../component/CustomButton";
import { useDispatch } from "react-redux";
import Loading from "../../../component/Loading";
import * as Auth from "@store/actions/auth";
const DeleteAccount = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const Delete = async () => {
    setIsLoading(true);
    action = Auth.deleteAccount();
    try {
      await dispatch(action);
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <View style={{ backgroundColor: "black", flex: 1 }}>
          <View
            style={{
              paddingVertical: normalize(40),
              width: "90%",
              alignSelf: "center",
              flex: 1,
            }}
          >
            <Icon
              name="left"
              size={normalize(25)}
              color="white"
              onPress={() => navigation.pop(1)}
            />
            <CustomText
              style={{
                marginTop: normalize(30),
                textAlign: "center",
                width: "90%",
                alignSelf: "center",
                color: "white",
              }}
            >
              Your account will be terminated after 30 days. If you login within
              30 days your account will be reactivated.
            </CustomText>
            <CustomButton
              title="Delete anyway"
              onPress={Delete}
              style={{
                alignSelf: "center",
                marginTop: normalize(20),
                backgroundColor: "#FF4545",
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default DeleteAccount;
