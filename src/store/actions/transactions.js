import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "dotenv";

export const CURRENTMONTHEXPENSE = "CURRENTMONTHEXPENSE";
export const EXPENSEBYMONTH = "EXPENSEBYMONTH";
export const TRANSACTIONS = "TRANSACTIONS";

export const currentMonthExpense = (user_id) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    await axios
      .post(
        API_URL + "currentmonthexpanse",
        { user_id },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {
        dispatch({
          type: CURRENTMONTHEXPENSE,
          currentmonthexpanse: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const expanseByMonth = (user_id) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    await axios
      .post(
        API_URL + "expansebymonth",
        { user_id },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {
        dispatch({ type: EXPENSEBYMONTH, expensebymonth: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const list = (user_id, param) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    await axios
      .post(
        API_URL + "list",
        { user_id, param },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
};
export const transactions = (params) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    const user_id = data.user.id;
    await axios
      .post(
        API_URL + "tranactions",
        {
          user_id,
          from_date: params ? params.from_date : "",
          to_date: params ? params.to_date : "",
        },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {
        dispatch({ type: TRANSACTIONS, transactions: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
