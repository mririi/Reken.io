import {
  CURRENTMONTHEXPENSE,
  EXPENSEBYMONTH,
  TRANSACTIONS,
} from "../actions/transactions";

//Initialising state
const initialState = {
  currentmonthexpanse: null,
  expensebymonth: null,
  transactions: null,
};
//Handling actions
export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENTMONTHEXPENSE:
      return {
        currentmonthexpanse: action.currentmonthexpanse,
      };
    case EXPENSEBYMONTH:
      return {
        expensebymonth: action.expensebymonth,
      };
    case TRANSACTIONS:
      return {
        transactions: action.transactions,
      };
    default:
      return state;
  }
};
