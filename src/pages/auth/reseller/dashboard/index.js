import React, { Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PartnerMenu from "@/component/PartnerMenu";
import ResellerDashboard from "@/pageComponent/Dashboard/ResellerDashboard";
import MetaTags from "@/component/MetaTags";

export default function DashboardIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Dashboard" />
      <PartnerMenu>
        <ResellerDashboard />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
