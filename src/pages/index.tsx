import Head from "next/head";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import { MAIN_LAYOUT } from "~/constants";
import IndexScreen from "~/components/pages/Index";

const Index: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Chainmart: Nơi mua sắm đáng tin cậy – Bạn của mọi nhà</title>
      <meta
        name="title"
        content="Chainmart: Nơi mua sắm đáng tin cậy – Bạn của mọi nhà"
      />
      <meta
        name="description"
        content="Chainmart: Nơi mua sắm đáng tin cậy – Bạn của mọi nhà"
      />
      <meta
        property="og:title"
        content="Chainmart: Nơi mua sắm đáng tin cậy – Bạn của mọi nhà"
      />
      <meta
        property="og:description"
        content="Chainmart: Nơi mua sắm đáng tin cậy – Bạn của mọi nhà"
      />
      <meta property="og:image" content="/og-image.png" />
    </Head>
    <IndexScreen />
  </>
);

Index.layout = MAIN_LAYOUT;

export default Index;
