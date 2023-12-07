import { http } from "../../utils/httpClient";
import {
    ENDPOINT_UPDATE_USER_DETAILS,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_ERROR,
    API_ENDPOINT_PHP,
} from "../constants";

export const updateUserDetailsAction = (data) => async (dispatch) => {
    try {
        const response = await http.post(
            `${API_ENDPOINT_PHP}${ENDPOINT_UPDATE_USER_DETAILS}`,
            data,
            {
                setAuthHeader: true,
            }
        );
        
        if (response?.data?.status == 200)
            dispatch({
                type: UPDATE_USER_DETAILS_SUCCESS,
                payload: response?.data,
            });
        else
            dispatch({
                type: UPDATE_USER_DETAILS_ERROR,
                payload: response?.response?.data
            });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_DETAILS_ERROR,
            payload: error?.response?.data,
        });
    }
};
