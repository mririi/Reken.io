import { AUTHENTICATE, LOGOUT } from "../actions/auth";

//Initialising state
const initialState = {
  user: null,
  token: null,
  balance: 100,
  OMFPercentage: 5,
};

//Handling actions
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        user: action.user,
        token: action.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
