import {
  ENDPOINT_GLOBAL_DISTRICT,
  GLOBAL_DISTRICT_ERROR,
  GLOBAL_DISTRICT_SUCCESS,
  API_ENDPOINT,
} from "../constants";
import axios from "axios";

const districtListAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_ENDPOINT}${ENDPOINT_GLOBAL_DISTRICT}`);
    if (res.data.status) {
      dispatch({
        type: GLOBAL_DISTRICT_SUCCESS,
        payload: res.data.detail.rows,
      });
    } else {
      dispatch({
        type: GLOBAL_DISTRICT_ERROR,
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
export { districtListAction };
