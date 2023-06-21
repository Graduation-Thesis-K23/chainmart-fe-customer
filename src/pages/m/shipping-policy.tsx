import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import ShippingPolicyScreen from "~/components/m/ShippingPolicy";

const ShippingPolicy: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("shippingPolicy")}</title>
    </Head>
    <ShippingPolicyScreen />
  </>
);

ShippingPolicy.layout = MAIN_LAYOUT;

export default ShippingPolicy;
