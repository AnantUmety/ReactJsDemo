import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/component/Layout";
import { Login } from "@/pageComponent/login&signup/Login";
import { Fragment, useEffect, useState } from "react";
import { deleteAllCookies, getCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import {
  IS_USER_LOGGED_IN,
  USER_LOGISTIC,
  USER_LOGISTIC_MANAGER,
  USER_RESELLER,
  USER_FINANCE,
  USER_TYPE,
  PATH_LOGISTIC_DASHBOARD,
  PATH_RESELLER_DASHBOARD,
  PATH_FINACE_ORDER,
} from "@/redux/constants";
import MetaTags from "@/component/MetaTags";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(-1);

  useEffect(() => {
    // if (router?.asPath.includes("callback")) router.replace("/");
    if (localStorage.getItem(IS_USER_LOGGED_IN) && getCookie(USER_TYPE)) {
      setIsLoggedIn(1);
    } else setIsLoggedIn(2);
  }, []);

  useEffect(() => {
    if (isLoggedIn == 1) {
      switch (getCookie(USER_TYPE)) {
        case USER_LOGISTIC:
        case USER_LOGISTIC_MANAGER:
          router.push(PATH_LOGISTIC_DASHBOARD);
          break;

        case USER_RESELLER:
          router.push(PATH_RESELLER_DASHBOARD);
          break;

        case USER_FINANCE:
          router.push(PATH_FINACE_ORDER);
          break;

        default:
          break;
      }
    } else if (isLoggedIn != -1) {
      chceckForSession();
      deleteAllCookies();
    }
  }, [isLoggedIn]);

  const chceckForSession = async () => {
    let session = await getSession();
    if (session?.accessToken) signOut({ redirect: false });
  };

  return (
    <Fragment>
      <MetaTags pageTitle="Login" />
      <Layout center bgBlack hideHeaderFooter>
        {isLoggedIn == 2 && <Login />}
      </Layout>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
