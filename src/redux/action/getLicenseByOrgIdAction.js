import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_SCHOOL_LICENSE,
  GET_SCHOOL_LICENSE_SUCCESS,
  GET_SCHOOL_LICENSE_ERROR,
} from "../constants";

export const getLicenseByOrgIdAction = (orgId) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_SCHOOL_LICENSE}?orgId=${orgId}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: GET_SCHOOL_LICENSE_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: GET_SCHOOL_LICENSE_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SCHOOL_LICENSE_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
