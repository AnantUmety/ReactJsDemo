import {
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_ERROR,
  } from "../constants";

  const initialState = {
    updateUserDetails: {
      data: [],
      success: false,
    },
  };
  const updateUserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER_DETAILS_SUCCESS:
      case UPDATE_USER_DETAILS_ERROR:
        return {
          ...state,
          data: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default updateUserDetailsReducer;