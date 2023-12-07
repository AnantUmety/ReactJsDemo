import { http } from "../../utils/httpClient";
import {
  ENDPOINT_FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  API_ENDPOINT_PHP,
} from "../constants";

export const forgotPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await http.post(
      `${API_ENDPOINT_PHP}${ENDPOINT_FORGOT_PASSWORD}`,
      data
    );

    if (response?.data?.status == 200)
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FORGOT_PASSWORD_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
