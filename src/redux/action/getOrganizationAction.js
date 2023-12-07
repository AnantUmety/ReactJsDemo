import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_ORGANIZATION,
  GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR,
} from "../constants";

export const getOrganizationAction =
  (search = "", limit = 10, start = 1, resellerIds = [] , status="") =>
  async (dispatch) => {
    let query = "";
    if (search != "") query += "search=" + search + "&";
    if (start > 0) query += "start=" + start + "&";
    if (status != "") query += "status=" + status + "&";
    if (resellerIds.length > 0) query += "resellerIds=[" + resellerIds + "]&";
    query += "limit=" + limit;

    try {
      const response = await http.get(
        `${API_ENDPOINT}${ENDPOINT_GET_ORGANIZATION}?${query}`,
        {
          setAuthHeader: true,
        }
      );

      if (response.data.status == 200)
        dispatch({
          type: GET_ORGANIZATION_SUCCESS,
          payload: response.data.detail,
        });
      else
        dispatch({
          type: GET_ORGANIZATION_ERROR,
          payload: response.data,
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ORGANIZATION_ERROR,
        payload: error.response.data,
      });
      console.error(error);
    }
  };
