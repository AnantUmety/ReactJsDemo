import {
  GET_SKU_LISTING_SUCCESS,
  GET_SKU_LISTING_ERROR,
  GET_SKU_DESCRIPTION_SUCCESS,
  GET_SKU_DESCRIPTION_ERROR,
  RESET_SKU_DESCRIPTION,
} from "../constants";

const initialState = {
  sku: {
    data: [],
    success: false,
  },
};

const skuDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SKU_LISTING_SUCCESS:
    case GET_SKU_LISTING_ERROR:
      return {
        ...state,
        skuListing: action.payload,
      };

    case GET_SKU_DESCRIPTION_SUCCESS:
    case GET_SKU_DESCRIPTION_ERROR:
      return {
        ...state,
        skuDetail: action.payload,
      };
    case RESET_SKU_DESCRIPTION:
      return {
        ...state,
        skuDetail: {},
      };

    default:
      return state;
  }
};

export default skuDetailReducer;
