import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

import { MAIN_LAYOUT } from "~/constants";
import PurchaseScreen from "~/components/pages/MyOrders";
import useTranslate from "~/hooks/useLocales";

const Purchase: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("purchase.title")}</title>
    </Head>
    <PurchaseScreen />
  </>
);
Purchase.layout = MAIN_LAYOUT;

export default Purchase;
