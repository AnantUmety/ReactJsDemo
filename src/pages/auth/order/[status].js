import React from "react";
import SchoolDetails from "@/pageComponent/SchoolDetails/SchoolDetails";
import PartnerMenu from "@/component/PartnerMenu";
import { useRouter } from "next/router";
import SchoolListByStatus from "@/pageComponent/SchoolListByStatus/SchoolListByStatus";
import Order from "@/pageComponent/Order/Order";
import OrderListByStatus from "@/pageComponent/OrderListByStatus/OrderListByStatus";

function SchoolListingIndex() {
  const router = useRouter();

  return (
    <PartnerMenu >
      <OrderListByStatus status={router.query.status} />
    </PartnerMenu>
  );
}

export default SchoolListingIndex;
