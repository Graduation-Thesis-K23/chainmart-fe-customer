import React from "react";
import { NextPageWithLayout } from "../_app";

import MainLayout from "~layouts/MainLayout";

const MyOrders: NextPageWithLayout = () => {
  return <p>MyOrders</p>;
};

MyOrders.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default MyOrders;
