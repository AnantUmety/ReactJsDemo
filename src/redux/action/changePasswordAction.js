import { http } from "../../utils/httpClient";
import {
  ENDPOINT_CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  API_ENDPOINT_PHP,
} from "../constants";

export const changePasswordAction = (formData) => async (dispatch) => {
  try {
    const response = await http.post(
      `${API_ENDPOINT_PHP}${ENDPOINT_CHANGE_PASSWORD}`,
      formData,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: error?.response?.data,
    });
  }
};
