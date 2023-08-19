import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";

import { MAIN_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";
import MomoScreen from "~/components/pages/Momo";

const MomoPage: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{`${useTranslate("checkout")} | ${useTranslate(
        "checkout.atm"
      )}`}</title>
    </Head>
    <MomoScreen />
  </>
);
MomoPage.layout = MAIN_LAYOUT;

export default MomoPage;
