import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";
import OrderForFinance from "@/pageComponent/OrderForFinance/OrderForFinance";

export default function OrderIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Order" />
      <PartnerMenu>
        <OrderForFinance />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
