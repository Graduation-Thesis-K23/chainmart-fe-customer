import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { LocalesProvider } from "../hooks/useLocales";
import "antd/dist/antd.css";
import "~/styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Code vui vẻ</title>
      </Head>
      <LocalesProvider>
        <Component {...pageProps} />
      </LocalesProvider>
    </>
  );
}

export default MyApp;
