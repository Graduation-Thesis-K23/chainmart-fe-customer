import React, { memo } from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

import SettingScreen from "~pages/Setting";
import { SETTING_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";

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
