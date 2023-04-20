//Declaring action types
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

//Declaring the authenticate action
export const authenticate = (fullname) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      fullname: fullname,
    });
  };
};

//Declaring the logout action
export const logout = () => {
  //Removing userdata from the storage
  return { type: LOGOUT };
};
