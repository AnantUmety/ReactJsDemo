import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SchoolStatus from "@/pageComponent/SchoolStatus/SchoolStatus";
import { useRouter } from "next/router";
import PartnerMenu from "@/component/PartnerMenu";

export default function PartnerStatusIndex() {
  const router = useRouter();
  return (
    <PartnerMenu>
      <SchoolStatus resellerId={router.query.id[0]} />
    </PartnerMenu>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
