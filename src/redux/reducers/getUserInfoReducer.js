import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from "../constants";

const initialState = {
  userAttribute: {
    data: [],
    success: false,
  },
};
const getUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        userAttribute: action.payload,
      };

    default:
      return state;
  }
};

export default getUserInfoReducer;
