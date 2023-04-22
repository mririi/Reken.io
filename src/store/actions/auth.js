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
    let bodyFormData = new FormData();
    Object.keys(values).forEach((f) => {
      bodyFormData.append(f, values[f]);
    });
    bodyFormData.append("device_type", Platform.OS == "android" ? "1" : "2");
    bodyFormData.append("newlogintype", "rekenio");
    bodyFormData.append("subscription", "free");
    //Adding a user to the database
    await axios
      .post(API_URL + "auth/user/signup", bodyFormData)
      .then((response) => console.log(response))
      .catch((error) => {
        let message = "Something went wrong!";
        if (error.response.data.message) {
          message = error.response.data.message;
        }
        throw new Error(message);
      });
  };
};
export const login = (user) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_URL}auth/user/login`, {
          email: user.email,
          password: user.password,
          newlogintype: "rekenio",
        })
        .then(async (response) => {
          dispatch({
            type: AUTHENTICATE,
            user: response.data.user,
          });
          saveDataToStorage(response.data);
        })
        .catch((error) => {
          console.log(error);
          let message = "Something went wrong!";
          if (error.response.data.message) {
            message = error.response.data.message;
          }
          throw new Error(message);
        });
    } catch (error) {
      let message = "Something went wrong!";
      throw new Error(message);
    }
  };
};
export const forgetPassword = (email) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_URL}auth/user/forgetpassword`, {
          email: email,
          newlogintype: "rekenio",
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
      throw new Error(error.message);
    }
  };
};
export const resetPassword = (values) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_URL}auth/user/resetpassword`, {
          email: values.email,
          new_password: values.password,
          newlogintype: "rekenio",
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
      throw new Error(error.message);
    }
  };
};
export const resendVerification = (email) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_URL}auth/user/resendverification`, {
          email: email,
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
      throw new Error(error.message);
    }
  };
};
export const verifyCode = (values) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_URL}auth/user/verify`, {
          email: values.email,
          otp: values.value,
          newlogintype: "rekenio",
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
      throw new Error(error.message);
    }
  };
};
export const getUser = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    try {
      await axios
        .get(`${API_URL}user-detail/${data.user.id}`, {
          headers: {
            Authorization: data.data.token,
          },
        })
        .then(async (response) => {
          dispatch({ type: "AUTHENTICATE", user: response.data });
        })
        .catch((error) => {
          let message = "Something went wrong!";
          if (error.response.data.message) {
            message = error.response.data.message;
          }
          throw new Error(message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
//Declaring the logout action
export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
const saveDataToStorage = (data) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      data,
    })
  );
};
