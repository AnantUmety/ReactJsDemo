import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT_PHP,
  ENDPOINT_ADD_ADMIN_USER,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_ERROR,
} from "../constants";

export const addUserAdminAction = (formData) => async (dispatch) => {
  try {
    const response = await http.post(
      `${API_ENDPOINT_PHP}${ENDPOINT_ADD_ADMIN_USER}`,
      formData,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: ADD_ADMIN_USER_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: ADD_ADMIN_USER_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    dispatch({
      type: ADD_ADMIN_USER_ERROR,
      payload: error?.response?.data,
    });
  }
};
