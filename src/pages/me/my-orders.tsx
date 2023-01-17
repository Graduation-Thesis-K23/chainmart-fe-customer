import React from "react";
import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";

const MyOrders: NextPageWithLayout = () => {
  return <p>MyOrders</p>;
};

MyOrders.layout = MAIN_LAYOUT;

export default MyOrders;
