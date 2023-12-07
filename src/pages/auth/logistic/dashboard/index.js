import React, { Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LogisticDashboard from "@/pageComponent/Dashboard/LogisticDashboard";
import PartnerMenu from "@/component/PartnerMenu";
import MetaTags from "@/component/MetaTags";

export default function DashboardIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Dashboard" />
      <PartnerMenu>
        <LogisticDashboard />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
