import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddLicense from "@/pageComponent/AddLicense/AddLicense";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";

export default function AddSchoolIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="Add License" />
    <PartnerMenu>
      <AddLicense />
    </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
