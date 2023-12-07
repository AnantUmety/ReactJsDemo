import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SchoolStatus from "@/pageComponent/SchoolStatus/SchoolStatus";
import PartnerMenu from "@/component/PartnerMenu";
import { getCookie } from "@/utils/cookies";
import { USER_SID, RESELLER_ID } from "@/redux/constants";
import { Fragment } from "react";
import MetaTags from "@/component/MetaTags";

export default function PartnerStatusIndex() {
  return (
    <Fragment>
      <MetaTags pageTitle="School" />
    <PartnerMenu>
      <SchoolStatus
        resellerUserSid={getCookie(USER_SID)}
        resellerId={getCookie(RESELLER_ID)}
      />
    </PartnerMenu>
    </Fragment>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
