import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  API_ENDPOINT_PHP,
  ENDPOINT_GET_USER_TOKEN,
  GET_REFRESH_TOKEN_URL,
} from "../../../redux/constants";
import { http } from "@/utils/httpClient";
import axios from "axios";

const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${API_ENDPOINT_PHP}${GET_REFRESH_TOKEN_URL}`,
      headers: {
        Authorization: refreshToken ? `Bearer ${refreshToken}` : "",
      },
    });
    if (!data || !data.status) {
      throw data;
    }
    return {
      accessToken: data?.detail?.data?.TOKEN,
      accessTokenExpires: Date.now() + data?.detail?.data?.payload?.exp / 1000,
      refreshToken: data?.detail?.data?.REFRESH_TOKEN,
    };
  } catch (error) {
    return {
      accessToken: "",
      refreshToken: "",
      deviceKey: "",
      idToken: "",
      accessTokenExpires: "",
      error: "RefreshAccessTokenError",
    };
  }
};

const adminLogin = async ({ username, password }) => {
  return await http.post(`${API_ENDPOINT_PHP}${ENDPOINT_GET_USER_TOKEN}`, {
    username,
    password,
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "partnerLogin",
      name: "Partner Login",

      async authorize(credentials, req) {
        const response = {
          data: {
            accessToken: null,
            refreshToken: null,
            deviceKey: null,
            idToken: null,
            accessTokenExpires: null,
          },

          error: {
            data: {
              userNameVal: null,
              sessionVal: null,
            },
            apiResponse: [],
            redirectToVerifyAccount: false,
            redirectToLogin: false,
            redirectToSetPassword: false,
            redirectToForgetPassword: false,
            resendCodeActionFailure: false,
          },
        };

        try {
          const { username, password } = credentials;
          const res = await adminLogin({ username, password });

          if (res?.data?.status === 200) {
            if (res?.data?.detail) {
              response.data.accessToken = res?.data?.detail?.data?.TOKEN;
              response.data.refreshToken =
                res?.data?.detail?.data?.REFRESH_TOKEN;
              response.data.accessTokenExpires =
                Date.now() + res?.data?.detail?.data?.payload?.exp / 1000;
            } else {
              throw new Error(JSON.stringify(res?.data));
            }
          } else {
            throw new Error(JSON.stringify(res));
          }
        } catch (error) {
          throw new Error(JSON.stringify(error.response.data));
        }
        return response;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, account, user, ...remain }) {
      if (user) {
        token = { ...token, ...user.data };
      }
      const MINUTE_MILLISECONDS = 60 * 1000;
      const accessTokenExpiresWithBuffer =
        token?.accessTokenExpires - MINUTE_MILLISECONDS;
      if (Date.now() < accessTokenExpiresWithBuffer) {
        return token;
      }
      // if(token?.refreshToken)
      return await refreshAccessToken(token?.refreshToken);
    },
    async session({ session, token, user }) {
      session = { ...session, ...token };
      return session;
    },
  },
});
