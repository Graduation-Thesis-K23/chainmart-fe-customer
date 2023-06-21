import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import TermsAndConditionScreen from "~/components/m/TermsAndCondition";

const TermsAndCondition: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("termsAndCondition")}</title>
    </Head>
    <TermsAndConditionScreen />
  </>
);

TermsAndCondition.layout = MAIN_LAYOUT;

export default TermsAndCondition;
