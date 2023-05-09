import {
  CURRENTMONTHEXPENSE,
  EXPENSEBYMONTH,
  TRANSACTIONS,
  LIST,
  KEY,
  SCAN,
} from "../actions/transactions";

//Initialising state
const initialState = {
  currentmonthexpanse: null,
  expensebymonth: null,
  transactions: null,
  categories: null,
  merchants: null,
  key:null,
  scandata:null,
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
    case LIST:
      return {
        categories: action.categories,
        merchants: action.merchants,
      };
      case KEY:
      return {
        key: action.key,
      };
      case SCAN:
      return {
        scandata: action.data,
      };
    default:
      return state;
  }
};
