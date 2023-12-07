import {
  LOGISTIC_DASHBOARD_SUCCESS,
  LOGISTIC_DASHBOARD_ERROR,
  RESELLER_DASHBOARD_SUCCESS,
  RESELLER_DASHBOARD_ERROR,
} from "../constants";

const initialState = {
  logisticCounts: {
    data: [],
    success: false,
  },
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGISTIC_DASHBOARD_SUCCESS:
    case LOGISTIC_DASHBOARD_ERROR:
      return {
        ...state,
        logisticCounts: action.payload,
      };

    case RESELLER_DASHBOARD_SUCCESS:
    case RESELLER_DASHBOARD_ERROR:
      return {
        ...state,
        resellerCounts: action.payload,
      };
    // case VERIFY_OTP_SUCCESS:
    // case VERIFY_OTP_ERROR:
    //   return {
    //     ...state,
    //     verifyOtp: action.payload,
    //   };

    // case "RESET_VERIFY_OTP":
    //   return {
    //     ...state,
    //     verifyOtp: {},
    //   };
    default:
      return state;
  }
};

export default dashboardReducer;
