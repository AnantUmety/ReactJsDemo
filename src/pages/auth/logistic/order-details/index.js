import React, { Fragment } from 'react';
import SchoolDetails from '@/pageComponent/SchoolDetails/SchoolDetails';
import PartnerMenu from '@/component/PartnerMenu';
import OrderDetails from '@/pageComponent/Order/OrderDetails';
import MetaTags from '@/component/MetaTags';

function OrderDetailIndex() {
  return (
    <Fragment>
    <MetaTags pageTitle="Order Details" />
    <PartnerMenu flex="justify">
       <OrderDetails />
    </PartnerMenu>
    </Fragment>
 
  )
}

export default OrderDetailIndex