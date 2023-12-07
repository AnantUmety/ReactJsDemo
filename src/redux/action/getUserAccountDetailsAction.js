import { http } from "../../utils/httpClient";
import {
    API_ENDPOINT,
    ENDPOINT_USER_ACCOUNT_DETAILS,
    USER_ACCOUNT_DETAILS_SUCCESS,
    USER_ACCOUNT_DETAILS_ERROR,
} from "../constants";

export const getUserAccountDetailsAction = async (dispatch) => {

    try {


        const response = await http.get(
            `${API_ENDPOINT}${ENDPOINT_USER_ACCOUNT_DETAILS}`,{setAuthHeader: true}
        );


                if (response.data.status == 200)
            dispatch({
                type: USER_ACCOUNT_DETAILS_SUCCESS,
                payload: response.data.detail,
            });
        else
            dispatch({
                type: USER_ACCOUNT_DETAILS_ERROR,
                payload: response.data,
            });
    } catch (error) {

        dispatch({
            type: USER_ACCOUNT_DETAILS_ERROR,
            payload: error?.response?.data,
        });
    }
}



