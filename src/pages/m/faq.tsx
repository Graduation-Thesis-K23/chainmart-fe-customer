import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "../_app";
import FaqScreen from "~/components/m/Faq";
import useTranslate from "~/hooks/useLocales";

const Faqs: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("faq")}</title>
    </Head>
    <FaqScreen />
  </>
);

Faqs.layout = MAIN_LAYOUT;

export default Faqs;
