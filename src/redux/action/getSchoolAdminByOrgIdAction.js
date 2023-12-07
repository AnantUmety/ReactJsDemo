import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_SCHOOL_ADMIN_LISTING,
  SCHOOL_ADMIN_LISTING_SUCCESS,
  SCHOOL_ADMIN_LISTING_ERROR,
} from "../constants";

export const getSchoolAdminByOrgIdAction = (orgId) => async (dispatch) => {
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_SCHOOL_ADMIN_LISTING}?orgId=${orgId}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200)
      dispatch({
        type: SCHOOL_ADMIN_LISTING_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: SCHOOL_ADMIN_LISTING_ERROR,
        payload: response?.response?.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SCHOOL_ADMIN_LISTING_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
