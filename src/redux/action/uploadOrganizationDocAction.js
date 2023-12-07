import { getSession } from "next-auth/react";
import { http } from "../../utils/httpClient";
import {
  API_ENDPOINT,
  ENDPOINT_ADD_UPLOAD_ORGANIZATION_DOC,
  ADD_UPLOAD_ORGANIZATION_DOC_SUCCESS,
  ADD_UPLOAD_ORGANIZATION_DOC_ERROR,
} from "../constants";
import axios from "axios";

export const uploadOrganizationDocAction = (data) => async (dispatch) => {
  try {
    let session = await getSession();
    const response = await axios({
      method: "post",
      url: `${API_ENDPOINT}${ENDPOINT_ADD_UPLOAD_ORGANIZATION_DOC}`,
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
        type: ADD_UPLOAD_ORGANIZATION_DOC_SUCCESS,
        payload: response.data.detail,
      });
    else
      dispatch({
        type: ADD_UPLOAD_ORGANIZATION_DOC_ERROR,
        payload: response.data,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_UPLOAD_ORGANIZATION_DOC_ERROR,
      payload: error?.response?.data,
    });
    console.error(error);
  }
};
