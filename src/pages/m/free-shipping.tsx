import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import FreeShippingScreen from "~/components/m/FreeShipping";

const FreeShipping: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("header.topLeft.0")}</title>
    </Head>
    <FreeShippingScreen />
  </>
);

FreeShipping.layout = MAIN_LAYOUT;

export default FreeShipping;
