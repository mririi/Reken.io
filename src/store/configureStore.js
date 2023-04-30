import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../store/reducers/auth";
import transactionsReducer from "../store/reducers/transactions";

//Declaring the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

//Declaring the store

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return store;
}
