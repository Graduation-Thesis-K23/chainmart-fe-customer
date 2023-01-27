import React from "react";
import Head from "next/head";

import type { NextPageWithLayout } from "./_app";
import { MAIN_LAYOUT } from "~/constants";
import CartScreen from "~pages/Cart";
import useTranslate from "~/hooks/useTranslate";

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
