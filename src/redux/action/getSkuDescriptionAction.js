import {
  API_ENDPOINT,
  GET_SKU_DESCRIPTION_SUCCESS,
  GET_SKU_DESCRIPTION_ERROR,
  ENDPOINT_GET_SKU_DESCRIPTION,
} from "../constants";
import { http } from "../../utils/httpClient";

const getSkuDescriptionAction = (skuId) => async (dispatch) => {
  try {
    const res = await http.get(`${API_ENDPOINT}${ENDPOINT_GET_SKU_DESCRIPTION}/${skuId}`);
    if (res.data.status) {
      dispatch({
        type: GET_SKU_DESCRIPTION_SUCCESS,
        payload: res.data.detail,
      });
    } else {
      dispatch({
        type: GET_SKU_DESCRIPTION_ERROR,
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
export { getSkuDescriptionAction };
