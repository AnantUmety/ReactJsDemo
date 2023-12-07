import {http} from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_GET_RESELLER_BY_USER_ID,
  GET_RESELLER_BY_USER_ID_SUCCESS,
  GET_RESELLER_BY_USER_ID_ERROR,
} from "../constants";

export const getResellerByUserIdAction = (userId) => async (dispatch) => {
 
  try {
    const response = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_RESELLER_BY_USER_ID}/${userId}`,
      {
        setAuthHeader: true,
      }
    );
   
    
    if (response.data.status == 200)
      dispatch({
        type: GET_RESELLER_BY_USER_ID_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: GET_RESELLER_BY_USER_ID_ERROR,
        payload: response.data,
      });
  } catch (error) {
    
    console.log(error);
    dispatch({
      type: GET_RESELLER_BY_USER_ID_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
