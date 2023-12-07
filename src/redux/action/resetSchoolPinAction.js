import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_RESET_SCHOOL_PIN,
  RESET_SCHOOL_PIN_SUCCESS,
  RESET_SCHOOL_PIN_ERROR,
} from "../constants";

export const resetSchoolPinAction = (formData) => async (dispatch) => {
  try {
    const response = await http.post(
      `${API_ENDPOINT}${ENDPOINT_RESET_SCHOOL_PIN}`,
      formData,
      {
        setAuthHeader: true,
      }
    );
    if (response?.data?.status == 200)
      dispatch({
        type: RESET_SCHOOL_PIN_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: RESET_SCHOOL_PIN_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: RESET_SCHOOL_PIN_ERROR,
      payload: error?.response?.data,
    });
  }
};
