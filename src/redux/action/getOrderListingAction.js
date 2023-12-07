import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_ORDERS_LISTING,
  GET_ORDERS_LISTING_SUCCESS,
  GET_ORDERS_LISTING_ERROR,
} from "../constants";

export const getOrderListingAction =
  (search = "", limit = 10, start = 1, status = "", isLatest = false) =>
  async (dispatch) => {
    let query = "";
    if (search != "") query += "search=" + search + "&";
    if (start > 0) query += "start=" + start + "&";
    if (status != "") query += "status=" + status + "&";
    if (isLatest) query += "latest=" + true + "&";

    query += "limit=" + limit;

    try {
      const response = await http.get(
        `${API_ENDPOINT}${ENDPOINT_GET_ORDERS_LISTING}?${query}`,
        {
          setAuthHeader: true,
        }
      );

      if (response?.data?.status == 200)
        dispatch({
          type: GET_ORDERS_LISTING_SUCCESS,
          payload: response?.data?.detail,
        });
      else
        dispatch({
          type: GET_ORDERS_LISTING_ERROR,
          payload: response?.data,
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ORDERS_LISTING_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
