import React from "react";

import MainLayout from "~layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

const FreeReturns: NextPageWithLayout = () => {
  return <div>Free Returns</div>;
};

FreeReturns.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default FreeReturns;
