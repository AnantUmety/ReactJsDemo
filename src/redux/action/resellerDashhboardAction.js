import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_RESELLER_DASHBOARD,
  RESELLER_DASHBOARD_SUCCESS,
  RESELLER_DASHBOARD_ERROR,
} from "../constants";

export const resellerDashhboardAction = (data) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_RESELLER_DASHBOARD}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: RESELLER_DASHBOARD_SUCCESS,
        payload: response.data,
      });
    else if (response?.data?.status == 400)
      dispatch({
        type: RESELLER_DASHBOARD_ERROR,
        payload: response.data,
      });
    else
      dispatch({
        type: RESELLER_DASHBOARD_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESELLER_DASHBOARD_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
