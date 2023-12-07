import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/component/Layout';
import SetPasswordPage from '@/pageComponent/AccountSetting/SetPasswordPage';
import { Fragment } from 'react';
import MetaTags from '@/component/MetaTags';
import { useRouter } from "next/router";

export default function setPassword() {
  const { t: langTrans } = useTranslation();

  const router = useRouter();

  return (
    <Fragment>
      <MetaTags pageTitle="Set Password" />
      <Layout center bgBlack hideHeaderFooter>
        <SetPasswordPage userId= {router.query.id} />
      </Layout>
    </Fragment>

  )
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});