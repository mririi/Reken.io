import { AUTHENTICATE, LOGOUT } from "../actions/auth";

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
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
