import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_SCHOOL_DEVICE_LISTING,
  GET_SCHOOL_DEVICE_LISTING_ERROR,
  GET_SCHOOL_DEVICE_LISTING_SUCCESS,
} from "../constants";

export const getSchoolDeviceByOrgIdAction = (orgId) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_SCHOOL_DEVICE_LISTING}?orgId=${orgId}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: GET_SCHOOL_DEVICE_LISTING_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: GET_SCHOOL_DEVICE_LISTING_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SCHOOL_DEVICE_LISTING_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
