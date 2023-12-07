import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  APPROVED_ORDER_POST,
  APPROVED_ORDER_SUCCESS,
  APPROVED_ORDER_ERROR,
} from "../constants";

export const approveOrderAction = (resellerData) => async (dispatch) => {
  try {
    let response = await http.put(
      `${API_ENDPOINT}${APPROVED_ORDER_POST}`,
      resellerData,
      {
        setAuthHeader: true,
      }
    );
    if (response?.data?.status == 200)
      dispatch({
        type: APPROVED_ORDER_SUCCESS,
        payload: response?.data,
      });
    else if (response?.data?.status == 400)
      dispatch({
        type: APPROVED_ORDER_ERROR,
        payload: response?.data,
      });
    else
      dispatch({
        type: APPROVED_ORDER_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: APPROVED_ORDER_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
