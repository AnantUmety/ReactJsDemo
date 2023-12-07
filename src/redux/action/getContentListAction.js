import {
  API_ENDPOINT,
  ENDPOINT_GET_CONTENT_LISTING,
  GET_CONTENT_LISTING_SUCCESS,
  GET_CONTENT_LISTING_ERROR
} from '../constants';
import { http } from '../../utils/httpClient';


const getContentListAction = () => async (dispatch) => {
  try {

    const res = await http.get(
      `${API_ENDPOINT}${ENDPOINT_GET_CONTENT_LISTING}`,{
        setAuthHeader: true,
      });
    if (res.data.status) {
      dispatch({
        type: GET_CONTENT_LISTING_SUCCESS,
        payload: res.data.detail.rows
      });
    } else {
      dispatch({
        type: GET_CONTENT_LISTING_ERROR,
        payload: res.data
      });
    }
    return res.data;
  } catch (error) {
    console.log('error', error);
    if (error.response) {
      return error.response.data;
    }
    else {
      return error;
    }
  }
};
export { getContentListAction };
