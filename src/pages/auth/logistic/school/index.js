import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SchoolStatus from "@/pageComponent/SchoolStatus/SchoolStatus";
import PartnerMenu from "@/component/PartnerMenu";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";
export default function PartnerStatusIndex() {
  const { t: langTrans } = useTranslation();

  return (
    <Fragment>
      <MetaTags pageTitle="School" />
      <PartnerMenu>
        <SchoolStatus />
      </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
