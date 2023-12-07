import { http } from "../../utils/httpClient";
import {
  ENDPOINT_SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
  API_ENDPOINT_PHP,
} from "../constants";

export const setPasswordAction = (data) => async (dispatch) => {

  try {
    let response = null;

    response = await http.post(
      `${API_ENDPOINT_PHP}${ENDPOINT_SET_PASSWORD}`,
      data
    );
    
    if (response?.data?.status == 200) {
      dispatch({
        type: SET_PASSWORD_SUCCESS,
        payload: response?.data,
      });
    }
    else {
      dispatch({
        type: SET_PASSWORD_ERROR,
        payload: response?.response?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: SET_PASSWORD_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
