import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "@constants/colors";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Loading = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setLoading(false);
        navigation.navigate("getStarted");
      } else {
        const { token } = JSON.parse(userData);
        dispatch(authActions.getUser(token));
        setLoading(false);
        navigation.navigate("BottomTabsNavigation");
      }
    };
    tryLogin();
  }, [dispatch]);
  return (
    <>
      {loading && (
        <View
          style={{
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color={colors.third} />
        </View>
      )}
    </>
  );
};

export default Loading;
