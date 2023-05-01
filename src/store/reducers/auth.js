import { AUTHENTICATE, LOGOUT, DELETE } from "../actions/auth";

//Initialising state
const initialState = {
  user: null,
  currency: null,
};

//Handling actions
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        user: action.user,
        currency: action.currency,
      };
    case DELETE:
      return initialState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
