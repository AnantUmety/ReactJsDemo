import {
  // GET_RESELLER_BY_UTID_SUCCESS,
  // GET_RESELLER_BY_UTID_ERROR,
  GET_RESELLER_SUCCESS,
  GET_RESELLER_ERROR,
  ADD_RESELLER_SUCCESS,
  ADD_RESELLER_ERROR,
  RESET_ADD_RESELLER,
  GET_RESELLER_BY_USER_ID_SUCCESS,
  GET_RESELLER_BY_USER_ID_ERROR,
} from "../constants";

const initialState = {
  resellerById: {
    data: [],
    success: false,
  },
};
const getResellerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_RESELLER_BY_UTID_SUCCESS:
    // case GET_RESELLER_BY_UTID_ERROR:
    //   return {
    //     ...state,
    //     resellerById: action.payload,
    //   };
    case GET_RESELLER_SUCCESS:
    case GET_RESELLER_ERROR:
      return {
        ...state,
        resellerList: action.payload,
      };
    case ADD_RESELLER_SUCCESS:
    case ADD_RESELLER_ERROR:
      return {
        ...state,
        addedReseller: action.payload,
      };
    case GET_RESELLER_BY_USER_ID_SUCCESS:
    case GET_RESELLER_BY_USER_ID_ERROR:
      return {
        ...state,
        resellerByUserId: action.payload,
      };
    case RESET_ADD_RESELLER:
      return {
        ...state,
        addedReseller: {},
        resellerByUserId:{}
      };

    default:
      return state;
  }
};

export default getResellerDataReducer;
