import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_ADD_ORGANIZATION,
  ADD_ORGANIZATION_SUCCESS,
  ADD_ORGANIZATION_ERROR,
} from "../constants";

export const addOrganizationAction =
  (resellerData, type) => async (dispatch) => {
    try {
      let response = null;
      if (type == "add")
        response = await http.post(
          `${API_ENDPOINT}${ENDPOINT_ADD_ORGANIZATION}`,
          resellerData,
          {
            setAuthHeader: true,
          }
        );
      else
        response = await http.put(
          `${API_ENDPOINT}${ENDPOINT_ADD_ORGANIZATION}`,
          resellerData,
          {
            setAuthHeader: true,
          }
        );
      if (response?.data?.status == 200)
        dispatch({
          type: ADD_ORGANIZATION_SUCCESS,
          payload: response?.data,
        });
      else if (response?.data?.status == 400)
        dispatch({
          type: ADD_ORGANIZATION_ERROR,
          payload: response?.data,
        });
      else
        dispatch({
          type: ADD_ORGANIZATION_ERROR,
          payload: response?.response?.data,
        });
    } catch (error) {
      dispatch({
        type: ADD_ORGANIZATION_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
