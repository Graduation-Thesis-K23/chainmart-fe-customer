import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { AUTH_LAYOUT } from "~/constants";
const LoginScreen = dynamic(() => import("~pages/Login"), { ssr: false });

const Purchase: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Login</title>
    </Head>
    <LoginScreen />
  </>
);
Purchase.layout = AUTH_LAYOUT;

export default Purchase;
