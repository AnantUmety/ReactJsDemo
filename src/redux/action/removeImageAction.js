import { http } from "@/utils/httpClient";
import {
  ENDPOINT_REMOVE_IMAGE,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_ERROR,
  API_ENDPOINT_PHP,
} from "../constants";

export const removeImageAction = async (dispatch) => {
  try {
    const response = await http.delete(
      `${API_ENDPOINT_PHP}${ENDPOINT_REMOVE_IMAGE}`,
      {
        setAuthHeader: true,
      }
    );

    if (response?.data?.status == 200) {
      dispatch({
        type: REMOVE_IMAGE_SUCCESS,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: REMOVE_IMAGE_ERROR,
        payload: response?.response?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_IMAGE_ERROR,
      payload: error?.response?.data,
    });
  }
};
