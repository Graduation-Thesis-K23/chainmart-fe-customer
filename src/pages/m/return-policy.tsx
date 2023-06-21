import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import ReturnPolicyScreen from "~/components/m/ReturnPolicy";

const ReturnPolicy: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("returnPolicy")}</title>
    </Head>
    <ReturnPolicyScreen />
  </>
);

ReturnPolicy.layout = MAIN_LAYOUT;

export default ReturnPolicy;
