import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/component/Layout";
import AccountSetting from "@/pageComponent/AccountSetting/AccountSetting";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";

export default function AccountSettingIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Account Setting" />
      <PartnerMenu sidebarMedium>
        <AccountSetting />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
