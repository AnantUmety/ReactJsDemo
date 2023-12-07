import {
  API_ENDPOINT,
  ENDPOINT_GET_LANGUAGE_LISTING,
  GET_LANGUAGE_LISTING_SUCCESS,
  GET_LANGUAGE_LISTING_ERROR,
} from "../constants";
import { http } from "../../utils/httpClient";

const getLanguageListAction = () => async (dispatch) => {
  try {
    const res = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_LANGUAGE_LISTING}`,
      {
        setAuthHeader: true,
      }
    );
    if (res.data.status) {
      dispatch({
        type: GET_LANGUAGE_LISTING_SUCCESS,
        payload: res.data.detail.rows,
      });
    } else {
      dispatch({
        type: GET_LANGUAGE_LISTING_ERROR,
        payload: res.data,
      });
    }
    return res.data;
  } catch (error) {
    console.log("error", error);
    if (error.response) {
      return error.response.data;
    } else {
      return error;
    }
  }
};
export { getLanguageListAction };
