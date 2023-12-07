import React from "react";
import SchoolDetails from "@/pageComponent/SchoolDetails/SchoolDetails";
import PartnerMenu from "@/component/PartnerMenu";
import { useRouter } from "next/router";
import SchoolListByStatus from "@/pageComponent/SchoolListByStatus/SchoolListByStatus";

function SchoolListingIndex() {
  const router = useRouter();

  return (
    <PartnerMenu >
      <SchoolListByStatus status={router.query.status} />
    </PartnerMenu>
  );
}

export default SchoolListingIndex;
