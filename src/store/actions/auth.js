import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "dotenv";
import { Platform } from "react-native";

//Declaring action types
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

//Declaring the signup action
export const signup = (values) => {
  return async (dispatch) => {
    //Adding a user to the database
    await axios
      .post(API_URL + "signup", {
        name: "zjzjzjz",
        email: "zjzzj@gjgjgjg.com",
        password: "zjzjzjzjzjzjz",
        currency: "USD",
        device_type: "1",
        newlogintype: "rekenio",
        subscription: "free",
      })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
        // let message = "Something went wrong!";
        // if (error.response.data.message) {
        //   message = error.response.data.message;
        // }
        // throw new Error(message);
      });
  };
};
export const login = (user) => {
  return async (dispatch) => {
    try {
      await axios
        .post("${API_URL}login", {
          email: user.email,
          password: user.password,
        })
        .then(async (response) => {
          console.log(response);
        })
        .catch((error) => {
          let message = "Something went wrong!";
          if (error.response.data.message) {
            message = error.response.data.message;
          }
          throw new Error(message);
        });
    } catch (error) {
      let message = "Something went wrong!";
      if (error.response.data.message) {
        message = error.response.data.message;
      }
      throw new Error(message);
    }
  };
};
//Declaring the signup action
export const updateProfile = (values) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { token } = JSON.parse(userData);
    const formData = new FormData();
    console.log(values.image);
    formData.append("photo", values.image);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    await axios
      .post("https://mft.aeliusventure.com/api/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getUser = (token) => {
  return async (dispatch) => {
    try {
      await axios
        .post("https://mft.aeliusventure.com/api/auth/refreshToken", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(async (response) => {
          AsyncStorage.removeItem("userData");
          saveDataToStorage(response.data.access_token);
          await axios
            .get("https://mft.aeliusventure.com/api/auth/user-profile", {
              headers: {
                Authorization: "Bearer " + response.data.access_token,
              },
            })
            .then((response) => {
              dispatch({
                type: AUTHENTICATE,
                user: response.data.user,
              });
            })
            .catch((error) => {
              let message = "Something went wrong!";
              if (error.response.data.message) {
                message = error.response.data.message;
              }
              throw new Error(message);
            });
        })
        .catch((error) => {
          let message = "Something went wrong!";
          if (error.response.data.message) {
            message = error.response.data.message;
          }
          throw new Error(message);
        });
    } catch (error) {
      let message = "Something went wrong!";
      if (error.response.data.message) {
        message = error.response.data.message;
      }
      throw new Error(message);
    }
  };
};

//Declaring the logout action
export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
const saveDataToStorage = (token) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};
