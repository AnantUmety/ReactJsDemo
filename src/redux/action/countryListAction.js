import {
  ENDPOINT_GLOBAL_COUNTRY,
  GLOBAL_COUNTRY_ERROR,
  GLOBAL_COUNTRY_SUCCESS,
  API_ENDPOINT
} from '../constants';
import axios from 'axios';

// import { http } from '../../utils/httpClient';


const countryListAction = () => async (dispatch) => {
  try {

    const res = await axios.get(
      `${API_ENDPOINT}${ENDPOINT_GLOBAL_COUNTRY}`);
    if (res.data.status) {
      dispatch({
        type: GLOBAL_COUNTRY_SUCCESS,
        payload: res.data.detail.rows
      });
    } else {
      dispatch({
        type: GLOBAL_COUNTRY_ERROR,
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
export { countryListAction };
