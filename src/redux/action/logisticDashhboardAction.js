import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_LOGISTIC_DASHBOARD,
  LOGISTIC_DASHBOARD_SUCCESS,
  LOGISTIC_DASHBOARD_ERROR,
} from "../constants";

export const logisticDashhboardAction = (data) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_LOGISTIC_DASHBOARD}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: LOGISTIC_DASHBOARD_SUCCESS,
        payload: response.data,
      });
    else if (response?.data?.status == 400)
      dispatch({
        type: LOGISTIC_DASHBOARD_SUCCESS,
        payload: response.data,
      });
    else
      dispatch({
        type: LOGISTIC_DASHBOARD_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGISTIC_DASHBOARD_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
