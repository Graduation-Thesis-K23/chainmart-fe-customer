import React, { Fragment, ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { NextPage } from "next/types";
import { ToastContainer } from "react-toastify";
import { Baloo_2 } from "@next/font/google";

import Loading from "~/components/atomics/Loading";
import ErrorBoundary from "~/components/ErrorBoundary";
import MainLayout from "~layouts/MainLayout";
import AuthLayout from "~layouts/AuthLayout";
import SettingLayout from "~layouts/SettingLayout";

import { LocalesProvider } from "../hooks/useLocales";
import { ProductDetailContext, CartContext } from "~/contexts";
import "react-multi-carousel/lib/styles.css";
import { MAIN_LAYOUT, AUTH_LAYOUT, SETTING_LAYOUT } from "~/constants";
import "react-toastify/dist/ReactToastify.css";
import "~/styles/index.scss";
import { AuthProvider } from "~/hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "~/redux";

export const nunito = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin", "vietnamese"],
  fallback: ["Roboto"],
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  layout?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
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
    case SETTING_LAYOUT:
      Layout = SettingLayout;
      break;
  }
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  useEffect(() => {
    const routeChangeStartHandler = () => setIsRouteChanging(true);

    const routeChangeEndHandler = () => setIsRouteChanging(false);

    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);
    router.events.on("hashChangeStart", () => console.log("s"));
    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, viewport-fit=cover"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#2da85c"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#2da85c"
        />
        <meta name="keywords" content="chainmart" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Vietnamese" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="hiepnguyen6014, iamphduc" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chainmart.site" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <ProductDetailContext.ProductDetailProvider>
            <CartContext.CartProvider>
              <AuthProvider>
                <LocalesProvider>
                  <>
                    {isRouteChanging ? (
                      <Loading />
                    ) : (
                      <div className={nunito.className}>
                        <Layout>
                          <>
                            <Component {...pageProps} />
                            <ToastContainer />
                          </>
                        </Layout>
                      </div>
                    )}
                  </>
                </LocalesProvider>
              </AuthProvider>
            </CartContext.CartProvider>
          </ProductDetailContext.ProductDetailProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
