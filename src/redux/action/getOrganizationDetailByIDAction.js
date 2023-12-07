import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  GET_ORGANIZATION_DETAIL_SUCCESS,
  GET_ORGANIZATION_DETAIL_ERROR,
  ENDPOINT_GET_ORGANIZATION_DETAIL,
} from "../constants";

export const getOrganizationDetailByIDAction =
  (schoolId) => async (dispatch) => {
    try {
      const response = await http.get(
        `${API_ENDPOINT}${ENDPOINT_GET_ORGANIZATION_DETAIL}/${schoolId}`,
        {
          setAuthHeader: true,
        }
      );

      if (response.data.status == 200)
        dispatch({
          type: GET_ORGANIZATION_DETAIL_SUCCESS,
          payload: response.data.detail,
        });
      else
        dispatch({
          type: GET_ORGANIZATION_DETAIL_ERROR,
          payload: response.data,
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ORGANIZATION_DETAIL_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
