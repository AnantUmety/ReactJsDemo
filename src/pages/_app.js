import "../../styles/global.css";
import "../../styles/scssGlobal/global.scss";
import { wrapper } from "../redux/store/configureStore";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import Script from "next/script";
import { initializeHttp } from "@/utils/httpClient";
import { SessionProvider } from "next-auth/react";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "@/component/Layout";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  initializeHttp();
  return (
    <Layout>
      <SessionProvider session={session}>
      <Component {...pageProps} />
      </SessionProvider>
      <Script src="https://unpkg.com/phosphors-icons"></Script>
    </Layout>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp, nextI18NextConfig));
