import Image from 'next/image'
import styles from '../page.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/component/Layout';
import { SignUp } from '@/pageComponent/login&signup/SignUp';
import { Fragment } from 'react';
import MetaTags from '@/component/MetaTags';

export default function Home() {
  const { t: langTrans } = useTranslation();

  return (
    <Fragment>
      <MetaTags pageTitle="Sign Up" />
      <Layout center bgBlack hideHeaderFooter>
        <SignUp />
     </Layout> 
    </Fragment>
    
  )
}
export const getServerSideProps = async ({locale}) => ({
  props: {
  ...(await serverSideTranslations(locale, ["common"])),
  },
});