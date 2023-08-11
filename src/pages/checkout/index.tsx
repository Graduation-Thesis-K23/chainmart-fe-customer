import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";

import { MAIN_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";
import CheckoutScreen from "~/components/pages/Checkout";

const CheckoutPage: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("cart")}</title>
      <meta name="title" content={useTranslate("cart")} />
      <meta name="description" content="Giỏ hàng" />
      <meta property="og:title" content="Giỏ hàng" />
      <meta property="og:description" content="Giỏ hàng" />
    </Head>
    <CheckoutScreen />
  </>
);
CheckoutPage.layout = MAIN_LAYOUT;

export default CheckoutPage;
