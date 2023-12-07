import axios from "axios";
import { deleteAllCookies, getCookie } from "./cookies";
import { getSession } from "next-auth/react";

const sessionExpireMsg = "Session expired. Redirecting to login screen...";
let refreshSubscribers = [];

const bootstrap = () => {
  http.interceptors.request.use(async (config) => {
    if (config.setAuthHeader) {
      let session = await getSession();
      if (session?.accessToken){
        config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
      }
      else {
        deleteAllCookies();
        window.location = "/unauthorize";
      }
    }

    return config;
  });

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const { response } = error;
      if (typeof window !== "undefined" && window) {
        if (response && response.status === 401) {
          deleteAllCookies();
          window.location = "/unauthorize";
          return Promise.reject({
            ...error.response,
            data: { detail: { message: sessionExpireMsg } },
          });
        }
      }
      return error;
    }
  );
  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => {
      cb(token);
    });
    refreshSubscribers = [];
  };
};

export const initializeHttp = async () => {
  bootstrap();
};
export const http = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
