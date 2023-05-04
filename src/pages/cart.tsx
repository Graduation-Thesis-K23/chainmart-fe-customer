import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "./_app";
import useTranslate from "~/hooks/useLocales";

const CartScreen = dynamic(() => import("~pages/Cart"), { ssr: false });

const Cart: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("cart")}</title>
    </Head>
    <CartScreen />
  </>
);

Cart.layout = MAIN_LAYOUT;

export default Cart;
