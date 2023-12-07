import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Notification from "@/pageComponent/Notification/Notification";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";

export default function NotificationIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Notification" />
    <PartnerMenu bgColor="blue" sidebarMedium>
      <Notification />
    </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
