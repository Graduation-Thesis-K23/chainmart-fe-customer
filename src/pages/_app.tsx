import React, { Fragment, ReactElement } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { NextPage } from "next/types";

import ErrorBoundary from "~/components/ErrorBoundary";
import MainLayout from "~layouts/MainLayout";
import AuthLayout from "~layouts/AuthLayout";

import { LocalesProvider } from "../hooks/useLocales";
import { ProductDetailContext, CartContext } from "~/contexts";
import "react-multi-carousel/lib/styles.css";
import { MAIN_LAYOUT, AUTH_LAYOUT } from "~/constants";
import "~/styles/index.scss";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  layout?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  let Layout:
    | React.NamedExoticComponent<{ children: ReactElement }>
    | React.ExoticComponent<{ children: ReactElement }> = Fragment;

  switch (Component.layout) {
    case MAIN_LAYOUT:
      Layout = MainLayout;
      break;
    case AUTH_LAYOUT:
      Layout = AuthLayout;
      break;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
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
        <ProductDetailContext.ProductDetailProvider>
          <CartContext.CartProvider>
            <LocalesProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LocalesProvider>
          </CartContext.CartProvider>
        </ProductDetailContext.ProductDetailProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
