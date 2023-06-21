import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import LegalNoticeScreen from "~/components/m/LegalNotice";

const LegalNotice: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("legalNotice")}</title>
    </Head>
    <LegalNoticeScreen />
  </>
);

LegalNotice.layout = MAIN_LAYOUT;

export default LegalNotice;
