import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "dotenv";

export const CURRENTMONTHEXPENSE = "CURRENTMONTHEXPENSE";
export const EXPENSEBYMONTH = "EXPENSEBYMONTH";
export const TRANSACTIONS = "TRANSACTIONS";
export const LIST = "LIST";
export const KEY = "KEY"
export const SCAN = "SCAN"

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
export const list = (param) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    const user_id = data.user.id;
    await axios
      .post(
        API_URL + "list",
        { user_id, param },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {
        if (param === "category") {
          dispatch({
            type: LIST,
            categories: response.data.data,
          });
        } else if (param === "merchant") {
          dispatch({
            type: LIST,
            merchants: response.data.data,
          });
        }
      })
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
          category_id: params ? params.category_id : "",
          merchant_id: params ? params.merchant_id : "",
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
export const addExpense = (values) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const { data } = JSON.parse(userData);
    const user_id = data.user.id;
    await axios
      .post(
        API_URL + "addexpanse",
        {
          user_id,
          name: values.name,
          category: values.category,
          expance_date: values.expance_date,
          payment_method: values.payment_method ?? "",
          taxes: !values.tax ? 0 : values.tax,
          //items: items,
        },
        { headers: { Authorization: data.data.token } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Scan
const SUBSCRIPTION_KEY = "95980ceffaae4d02ba1f3486f6b299e8";
const BASE_URL =
  "https://aelius.cognitiveservices.azure.com/formrecognizer/v2.1/prebuilt/receipt/";

export const fetchReceipt = (key) => {
  return async (dispatch) => {
    await axios
      .get(BASE_URL + `analyzeResults/${key}`, {
        headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY },
      })
      .then((response) => {
        console.log(response)
        dispatch({type:SCAN,data:response.data})
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postReceipt = (file, type) => {
  return async (dispatch) => {
    await axios
      .post(BASE_URL + "analyze", file, {
        headers: {
          "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
          "Content-Type": type,
        },
      })
      .then(async (response) => {
        console.log(response);
        const operationLocation = response.headers["operation-location"];
        const key = operationLocation.substring(
          operationLocation.lastIndexOf("/") + 1
        );
        dispatch({type:KEY,key:key})
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
