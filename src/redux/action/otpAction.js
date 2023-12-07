import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
  ENDPOINT_VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
} from "../constants";

export const sendOtpAction = (data) => async (dispatch) => {
  try {
    let response = null;

    response = await http.post(`${API_ENDPOINT}${ENDPOINT_SEND_OTP}`, data, {
      setAuthHeader: true,
    });

    if (response?.data?.status == 200)
      dispatch({
        type: SEND_OTP_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: SEND_OTP_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: SEND_OTP_ERROR,
      payload: error?.response?.data,
    });
  }
};

export const verifyOtpAction = (data) => async (dispatch) => {
  try {
    let response = null;

    response = await http.post(`${API_ENDPOINT}${ENDPOINT_VERIFY_OTP}`, data, {
      setAuthHeader: true,
    });

    if (response?.data?.status == 200)
      dispatch({
        type: VERIFY_OTP_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: VERIFY_OTP_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_ERROR,
      payload: error?.response?.data,
    });
  }
};
