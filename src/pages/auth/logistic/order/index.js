import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Order from "@/pageComponent/Order/Order";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";

export default function OrderIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Order" />
      <PartnerMenu>
        <Order />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
