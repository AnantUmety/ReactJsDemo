import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_ORGANIZATION_BY_RESELLER_ID,
  GET_ORGANIZATION_BY_RESELLER_ID_SUCCESS,
  GET_ORGANIZATION_BY_RESELLER_ID_ERROR,
} from "../constants";

export const getOrganiztionByResellerIdAction =
  (resellerId, search = "", limit = 10, start = 1,status="") =>
  async (dispatch) => {
    try {
      let query = "&";
      if (search != "") query += "search=" + search + "&";
      if (status != "") query += "status=" + status + "&";
      if (start > 0) query += "start=" + start + "&";
      query += "limit=" + limit;
     
      const response = await http.get(
        `${API_ENDPOINT}${ENDPOINT_GET_ORGANIZATION_BY_RESELLER_ID}?resellerId=${resellerId}${query}`,
        {
          setAuthHeader: true,
        }
      );

      if (response.data.status == 200)
        dispatch({
          type: GET_ORGANIZATION_BY_RESELLER_ID_SUCCESS,
          payload: response.data.detail,
        });
      else
        dispatch({
          type: GET_ORGANIZATION_BY_RESELLER_ID_ERROR,
          payload: response.data,
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ORGANIZATION_BY_RESELLER_ID_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
