import React from "react";
import { MAIN_LAYOUT } from "~/constants";
import Head from "next/head";

import { NextPageWithLayout } from "../_app";
import OrderLookupScreen from "~/components/m/OrderLookup";
import useTranslate from "~/hooks/useLocales";

const OrderLookup: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("orderLookup")}</title>
    </Head>
    <OrderLookupScreen />
  </>
);

OrderLookup.layout = MAIN_LAYOUT;

export default OrderLookup;
