import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  RESET_CHANGE_PASSWORD,
} from "../constants";

const initialState = {
  changePwd: {
    data: [],
    success: false,
  },
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePwd: action.payload,
      };

    case RESET_CHANGE_PASSWORD:
      return {
        ...state,
        changePwd: {},
      };

    default:
      return state;
  }
};

export default changePasswordReducer;
