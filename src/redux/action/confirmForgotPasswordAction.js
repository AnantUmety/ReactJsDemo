import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_CONFIRM_FORGOT_PASSWORD,
  CONFIRM_FORGOT_PASSWORD_SUCCESS,
  CONFIRM_FORGOT_PASSWORD_ERROR,
} from "../constants";

export const confirmForgotPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await http.post(
      `${API_ENDPOINT}${ENDPOINT_CONFIRM_FORGOT_PASSWORD}`,
      data
    );

    if (response?.data?.status == 200)
      dispatch({
        type: CONFIRM_FORGOT_PASSWORD_SUCCESS,
        payload: response.data,
      });
    else if (response?.data?.status == 400)
      dispatch({
        type: CONFIRM_FORGOT_PASSWORD_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: CONFIRM_FORGOT_PASSWORD_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CONFIRM_FORGOT_PASSWORD_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
