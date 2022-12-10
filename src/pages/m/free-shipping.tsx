import React from "react";

import MainLayout from "~layouts/MainLayout";
import { NextPageWithLayout } from "../_app";

const FreeShipping: NextPageWithLayout = () => {
  return <div>Free Shipping</div>;
};

FreeShipping.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default FreeShipping;
