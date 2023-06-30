import React, { memo } from "react";

import Address from "./components/Address";
import Breadcrumb from "./components/Breadcrumb";

const Checkout = () => (
  <>
    <Breadcrumb />
    <Address />
  </>
);

export default memo(Checkout);
