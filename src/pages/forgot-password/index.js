
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/component/Layout';
import ForgotPassword from '@/pageComponent/Forgotpassword/ForgotPassword';
import { Fragment } from 'react';
import MetaTags from '@/component/MetaTags';

export default function ForgotPasswordIndex() {
  const { t: langTrans } = useTranslation();

  return (
    <Fragment>
      <MetaTags pageTitle="Forgot Password" />
      <Layout center bgBlack hideHeaderFooter>
         <ForgotPassword />
     </Layout>
    </Fragment>
      
  )
}
export const getServerSideProps = async ({locale}) => ({
  props: {
  ...(await serverSideTranslations(locale, ["common"])),
  },
});