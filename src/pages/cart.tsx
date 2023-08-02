import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "./_app";
import useTranslate from "~/hooks/useLocales";

import CartScreen from "~/components/pages/Cart";

const Cart: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{useTranslate("cart")}</title>
        <meta name="title" content={useTranslate("cart")} />
        <meta name="description" content="Giỏ hàng" />
        <meta property="og:title" content="Giỏ hàng" />
        <meta property="og:description" content="Giỏ hàng" />
      </Head>
      <CartScreen />
    </>
  );
};

Cart.layout = MAIN_LAYOUT;

export default Cart;
