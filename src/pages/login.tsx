import Head from "next/head";
import React from "react";
import { AUTH_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";

import LoginScreen from "~pages/Login";
import type { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("header.topRight.login")}</title>
    </Head>
    <LoginScreen />
  </>
);

Login.layout = AUTH_LAYOUT;

export default Login;
