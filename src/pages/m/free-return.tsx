import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "../_app";
import FreeReturnScreen from "~/components/m/FreeReturn";
import useTranslate from "~/hooks/useLocales";

const FreeReturns: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("header.topLeft.1")}</title>
    </Head>
    <FreeReturnScreen />
  </>
);

FreeReturns.layout = MAIN_LAYOUT;

export default FreeReturns;
