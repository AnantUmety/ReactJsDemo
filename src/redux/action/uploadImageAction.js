import { getSession } from "next-auth/react";
import {
    
    ENDPOINT_UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    API_ENDPOINT_PHP,
} from "../constants";
import axios from "axios";

export const uploadImageAction = (data) => async (dispatch) => {

    try {
        let session = await getSession();
        const response = await axios({
            method: "post",
            url: `${API_ENDPOINT_PHP}${ENDPOINT_UPLOAD_IMAGE}`,
            data: data,
            headers: {
                "Content-Type": `multipart/form-data`,
                Authorization: session?.accessToken
                    ? `Bearer ${session?.accessToken}`
                    : "",
            },
        });

        if (response.data.status == 200)
            dispatch({
                type: UPLOAD_IMAGE_SUCCESS,
                payload: response?.data,
            });
        else
            dispatch({
                type: UPLOAD_IMAGE_ERROR,
                payload: response?.data,
            });
    } catch (error) {
        dispatch({
            type: UPLOAD_IMAGE_ERROR,
            payload: error?.response?.data,
        });
    }
};