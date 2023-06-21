import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import { NextPageWithLayout } from "../_app";
import useTranslate from "~/hooks/useLocales";
import AboutUsScreen from "~/components/m/AboutUs";

const AboutUs: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("aboutUs")}</title>
    </Head>
    <AboutUsScreen />
  </>
);

AboutUs.layout = MAIN_LAYOUT;

export default AboutUs;
