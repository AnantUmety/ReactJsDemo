import {
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
} from "../constants";

const initialState = {
  setPassword: {
    data: [],
    success: false,
  },
};
const setPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD_SUCCESS:
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        setPassword: action.payload,
      };
    

    default:
      return state;
  }
};

export default setPasswordReducer;
