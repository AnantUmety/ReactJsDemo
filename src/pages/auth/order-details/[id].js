import React from "react";
import PartnerMenu from "@/component/PartnerMenu";
import { useRouter } from "next/router";
import OrderDetails from "@/pageComponent/OrderDetails/OrderDetails";

function OrderDetailsIndex() {
  const router = useRouter();

  return (
    <PartnerMenu flex="justify">
      <OrderDetails orderId={router.query.id} />
    </PartnerMenu>
  );
}

export default OrderDetailsIndex;
