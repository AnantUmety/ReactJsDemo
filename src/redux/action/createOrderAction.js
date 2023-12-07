import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
} from "../constants";

export const createOrderAction = (resellerData) => async (dispatch) => {
  try {
    let response = await http.post(
      `${API_ENDPOINT}${ENDPOINT_CREATE_ORDER}`,
      resellerData,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: response?.data,
      });
    else if (response?.data?.status == 400)
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: response?.data,
      });
    else
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
