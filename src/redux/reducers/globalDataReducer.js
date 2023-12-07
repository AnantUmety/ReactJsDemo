import { GLOBAL_COUNTRY_SUCCESS, GLOBAL_DISTRICT_SUCCESS } from "../constants";

const initialState = {
  globalData: {
    data: {},
    success: false,
  },
};

const globalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_COUNTRY_SUCCESS:
      return {
        ...state,
        globalData: {
          ...state.globalData,
          countries: action.payload,
        },
      };

    case GLOBAL_DISTRICT_SUCCESS:
      return {
        ...state,
        globalData: {
          ...state.globalData,
          district: action.payload,
        },
      };

    default:
      return state;
  }
};

export default globalDataReducer;
