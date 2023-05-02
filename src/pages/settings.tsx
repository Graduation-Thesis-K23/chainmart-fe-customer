import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "./_app";

import { SETTING_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";

const SettingScreen = dynamic(() => import("~pages/Setting"), { ssr: false });

const Setting: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("header.topRight.myAccount")}</title>
    </Head>
    <SettingScreen />
  </>
);
Setting.layout = SETTING_LAYOUT;

export default Setting;
