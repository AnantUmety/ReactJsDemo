import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/component/Layout";
import AddSchool from "@/pageComponent/AddSchool/AddSchool";
import PartnerStatus from "@/pageComponent/PartnerStatus/PartnerStatus";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";
export default function PartnerStatusIndex() {
  const { t: langTrans } = useTranslation();

  return (
    <Fragment>
      <MetaTags pageTitle="School" />
      <PartnerMenu>
        <PartnerStatus />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
