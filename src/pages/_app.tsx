import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import ErrorBoundary from "~/components/ErrorBoundary";

import { LocalesProvider } from "../hooks/useLocales";
import { ProductDetailProvider } from "~/contexts/ProductDetailContext";
import "~/styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="keywords" content="chainmart" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="hiepnguyen6014, iamphduc" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chainmart.site" />
      </Head>
      <ErrorBoundary>
        <LocalesProvider>
          <ProductDetailProvider>
            <Component {...pageProps} />
          </ProductDetailProvider>
        </LocalesProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
