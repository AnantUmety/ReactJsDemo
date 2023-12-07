import {
  GET_ORDERS_LISTING_SUCCESS,
  GET_ORDERS_LISTING_ERROR,
  GET_RESELLER_SUCCESS,
  GET_RESELLER_ERROR,
  ADD_RESELLER_SUCCESS,
  ADD_RESELLER_ERROR,
  RESET_CREATE_ORDER,
  GET_RESELLER_BY_USER_ID_SUCCESS,
  GET_RESELLER_BY_USER_ID_ERROR,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_DETAIL_ERROR,
  GET_ORDER_DETAIL_SUCCESS,
} from "../constants";

const initialState = {
  orderList: {
    data: [],
    success: false,
  },
};
const getOrderDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_RESELLER_BY_UTID_SUCCESS:
    // case GET_RESELLER_BY_UTID_ERROR:
    //   return {
    //     ...state,
    //     resellerById: action.payload,
    //   };
    case GET_ORDERS_LISTING_SUCCESS:
    case GET_ORDERS_LISTING_ERROR:
      return {
        ...state,
        orderList: action.payload,
      };
    case CREATE_ORDER_ERROR:
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrder: action.payload,
      };
    case GET_ORDER_DETAIL_ERROR:
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
      };
    case RESET_CREATE_ORDER:
      return {
        ...state,
        createOrder: {},
      };

    default:
      return state;
  }
};

export default getOrderDataReducer;
