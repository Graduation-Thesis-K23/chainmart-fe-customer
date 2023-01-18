import React from "react";
import { MAIN_LAYOUT } from "~/constants";

import { NextPageWithLayout } from "../_app";

const FreeShipping: NextPageWithLayout = () => {
  return <div>Free Shipping</div>;
};

FreeShipping.layout = MAIN_LAYOUT;

export default FreeShipping;
