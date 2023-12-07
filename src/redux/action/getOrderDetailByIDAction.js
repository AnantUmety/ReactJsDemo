import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  GET_ORDER_DETAIL_ERROR,
  ENDPOINT_GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
} from "../constants";

export const getOrderDetailByIDAction = (orderId) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_ORDER_DETAIL}/${orderId}`,
      {
        setAuthHeader: true,
      }
    );

    if (response.data.status == 200)
      dispatch({
        type: GET_ORDER_DETAIL_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: GET_ORDER_DETAIL_ERROR,
        payload: response.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ORDER_DETAIL_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
