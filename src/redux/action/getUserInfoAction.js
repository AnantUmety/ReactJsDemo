import {http} from "../../utils/httpClient";
import {
  ENDPOINT_GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  API_ENDPOINT_PHP,
} from "../constants";

export const getUserInfoAction = () => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT_PHP}${ENDPOINT_GET_USER_INFO}`,
      {
        setAuthHeader: true,
      }
    );

    if (response.data.status == 200)
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: GET_USER_INFO_ERROR,
        payload: response.data,
      });
  } catch (error) {
    
    console.log(error);
    dispatch({
      type: GET_USER_INFO_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
