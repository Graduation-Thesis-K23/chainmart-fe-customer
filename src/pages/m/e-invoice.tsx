import React from "react";
import { MAIN_LAYOUT } from "~/constants";

import { NextPageWithLayout } from "../_app";
import EInvoiceScreen from "~/components/m/EInvoice";
import useTranslate from "~/hooks/useLocales";
import Head from "next/head";

const EInvoice: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("e-invoice")}</title>
    </Head>
    <EInvoiceScreen />
  </>
);

EInvoice.layout = MAIN_LAYOUT;

export default EInvoice;
