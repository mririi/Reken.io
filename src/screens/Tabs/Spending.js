import React from "react";
import { View } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import normalize from "react-native-normalize";
import { useEffect } from "react";
import * as Transactions from "@store/actions/transactions";
import { useCallback } from "react";
import CustomTabView from "../../component/CustomTabView";
import Loading from "../../component/Loading";
import { useIsFocused } from "@react-navigation/native";

const Spending = () => {
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.auth.currency);

  const expensebymonth = useSelector(
    (state) => state.transactions.expensebymonth
  );
  console.log(user);
  console.log(expensebymonth);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loadExpenseByMonth = useCallback(async () => {
    try {
      if (user) {
        dispatch(Transactions.expanseByMonth(user.id));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (!expensebymonth) {
    }
  }, [expensebymonth]);
  useEffect(() => {
    if (isFocused) {
      loadExpenseByMonth();
    }
  }, [isFocused]);
  useEffect(() => {
    loadExpenseByMonth();
  }, [loadExpenseByMonth]);

  return (
    <>
      {!expensebymonth && <Loading />}
      {expensebymonth && (
        <View
          style={{
            flex: 1,
            paddingTop: normalize(40),
            backgroundColor: "#0A3713",
          }}
        >
          <CustomTabView
            expansebymonth={expensebymonth}
            user={user}
            currency={currency}
          />
        </View>
      )}
    </>
  );
};

export default Spending;
