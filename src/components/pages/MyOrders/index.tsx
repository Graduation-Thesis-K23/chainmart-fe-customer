import React from "react";

import Breadcrumb from "./components/Breadcrumb";
import OrdersTabs from "./components/OrdersTabs";
import withAuth from "~/hocs/withAuth";

const Purchase = () => (
  <>
    <Breadcrumb />
    <OrdersTabs />
  </>
);

export default withAuth(Purchase);
