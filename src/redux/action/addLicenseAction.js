import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_ADD_LICENSE,
  ADD_LICENSE_SUCCESS,
  ADD_LICENSE_ERROR,
} from "../constants";

export const addLicenseAction =
  (licenseData, type = "add") =>
  async (dispatch) => {
    try {
      let response = null;
      if (type == "add")
        response = await http.post(
          `${API_ENDPOINT}${ENDPOINT_ADD_LICENSE}`,
          licenseData,
          {
            setAuthHeader: true,
          }
        );
      else
        response = await http.put(
          `${licenseData}${ENDPOINT_ADD_LICENSE}`,
          resellerData,
          {
            setAuthHeader: true,
          }
        );

      if (response?.data?.status == 200)
        dispatch({
          type: ADD_LICENSE_SUCCESS,
          payload: response?.data,
        });
      else if (response?.data?.status == 400)
        dispatch({
          type: ADD_LICENSE_ERROR,
          payload: response?.data,
        });
      else
        dispatch({
          type: ADD_LICENSE_ERROR,
          payload: response?.response?.data,
        });
    } catch (error) {
      dispatch({
        type: ADD_LICENSE_ERROR,
        payload: error?.response?.data,
      });
      console.error(error);
    }
  };
