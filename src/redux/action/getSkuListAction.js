import {
  API_ENDPOINT,
  GET_SKU_LISTING_SUCCESS,
  GET_SKU_LISTING_ERROR,
  ENDPOINT_GET_SKU_LISTING,
} from "../constants";
import { http } from "../../utils/httpClient";

const getSkuListAction = () => async (dispatch) => {
  try {
    const res = await http.get(`${API_ENDPOINT}${ENDPOINT_GET_SKU_LISTING}`);
    if (res.data.status) {
      dispatch({
        type: GET_SKU_LISTING_SUCCESS,
        payload: res.data.detail.rows,
      });
    } else {
      dispatch({
        type: GET_SKU_LISTING_ERROR,
        payload: res.data,
      });
    }
    return res.data;
  } catch (error) {
    console.log("error", error);
    if (error.response) {
      return error.response.data;
    } else {
      return error;
    }
  }
};
export { getSkuListAction };
