import React from "react";
import SchoolDetails from "@/pageComponent/SchoolDetails/SchoolDetails";
import PartnerMenu from "@/component/PartnerMenu";
import { useRouter } from "next/router";

function SchoolDetailsIndex() {
  const router = useRouter();

  return (
    <PartnerMenu flex="justify">
      <SchoolDetails schoolId={router.query.id} />
    </PartnerMenu>
  );
}

export default SchoolDetailsIndex;
