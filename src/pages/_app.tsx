import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { NextPage } from "next/types";

import ErrorBoundary from "~/components/ErrorBoundary";

import { LocalesProvider } from "../hooks/useLocales";
import { ProductDetailContext, CartContext } from "~/contexts";
import "react-multi-carousel/lib/styles.css";
import "~/styles/index.scss";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="chainmart" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="hiepnguyen6014, iamphduc" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chainmart.site" />
      </Head>
      <ProductDetailContext.ProductDetailProvider>
        <CartContext.CartProvider>
          <ErrorBoundary>
            <LocalesProvider>
              <>{getLayout(<Component {...pageProps} />)}</>
            </LocalesProvider>
          </ErrorBoundary>
        </CartContext.CartProvider>
      </ProductDetailContext.ProductDetailProvider>
    </>
  );
};

export default MyApp;
