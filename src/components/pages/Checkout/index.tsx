import React from "react";

import Address from "./components/Address";
import Breadcrumb from "./components/Breadcrumb";
import Ordered from "./components/Ordered";
import Payment from "./components/Payment";
import withAuth from "~/hocs/withAuth";

const Checkout = () => (
  <>
    <Breadcrumb />
    <Address />
    <Ordered />
    <Payment />
  </>
);

export default withAuth(Checkout);
