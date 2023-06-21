import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import CareersScreen from "~/components/m/Careers";

const Careers: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("careers")}</title>
    </Head>
    <CareersScreen />
  </>
);

Careers.layout = MAIN_LAYOUT;

export default Careers;
