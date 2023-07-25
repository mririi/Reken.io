import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "@store/actions/auth";
import AuthStackNavigator from "./AuthStackNavigator";
import NotAuthStackNavigator from "./NotAuthStackNavigator";

const MainStackNavigation = () => {
    const [isAuth, setIsAuth] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const tryLogin = async () => {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          setLoading(false);
          setIsAuth(false);
        } else {
          dispatch(Auth.getUser());
          setIsAuth(true);
          setLoading(false);
        }
      };
      tryLogin();
    }, [dispatch]);
  
    return (
        <>
        {isAuth && (
            <AuthStackNavigator />
        )}
        {!isAuth && (
            <NotAuthStackNavigator />
            )}
        </>
    );
  };

export default MainStackNavigation;