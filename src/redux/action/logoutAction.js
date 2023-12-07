import {
  IS_USER_LOGGED_IN,
} from "../constants";

const logoutAction = () => async (dispatch, router) => {
  try {
    localStorage.removeItem(IS_USER_LOGGED_IN)
    window.location.href = "/";
    // deleteAllCookies("logout");
    
    
    //   signOut();
    // const res = await http.get(`${API_ENDPOINT}${ENDPOINT_LOGOUT}`, {
    //   setAuthHeader: true,
    // });
    // if (res.data.status) {
    //   deleteAllCookies();
    //   window.location.href = "/";
    //   signOut();
      
    //   dispatch({
    //     type: LOGOUT_SUCCESS,
    //     payload: res.data,
    //   });
    // } else {
    //   dispatch({
    //     type: LOGOUT_ERROR,
    //     payload: res.data,
    //   });
    // }
    // return res.data;
  } catch (error) {
    console.log("error", error);
    if (error.response) {
      return error.response.data;
    } else {
      return error;
    }
  }
};
export { logoutAction };
