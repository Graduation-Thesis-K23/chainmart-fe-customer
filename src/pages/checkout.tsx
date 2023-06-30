import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { MAIN_LAYOUT } from "~/constants";
const CheckoutScreen = dynamic(() => import("~pages/Checkout"), { ssr: false });
import useTranslate from "~/hooks/useLocales";

const Checkout: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("search.title")}</title>
    </Head>
    <CheckoutScreen />
  </>
);
Checkout.layout = MAIN_LAYOUT;

export default Checkout;
