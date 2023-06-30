import React, { memo } from "react";

import Address from "./components/Address";
import Breadcrumb from "./components/Breadcrumb";
import Ordered from "./components/Ordered";
import Payment from "./components/Payment";

const Checkout = () => (
  <>
    <Breadcrumb />
    <Address />
    <Ordered />
    <Payment />
  </>
);

export default memo(Checkout);
