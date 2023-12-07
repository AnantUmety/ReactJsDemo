import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_RESELLER,
  GET_RESELLER_SUCCESS,
  GET_RESELLER_ERROR,
} from "../constants";

export const getResellersAction =
  (search = "", limit = 10, start = 1) =>
  async (dispatch) => {
    let query = "";
    if (search != "") query += "search=" + search + "&";
    if (start > 0) query += "start=" + start + "&";
    query += "limit=" + limit;

    try {
      const response = await http.get(
        `${API_ENDPOINT}${ENDPOINT_GET_RESELLER}?${query}`,
        {
          setAuthHeader: true,
        }
      );

      if (response.data.status == 200)
        dispatch({
          type: GET_RESELLER_SUCCESS,
          payload: response?.data?.detail,
        });
      else
        dispatch({
          type: GET_RESELLER_ERROR,
          payload: response?.response?.data,
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_RESELLER_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
