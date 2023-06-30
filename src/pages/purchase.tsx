import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { MAIN_LAYOUT } from "~/constants";
const PurchaseScreen = dynamic(() => import("~pages/MyOrders"), { ssr: false });
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
