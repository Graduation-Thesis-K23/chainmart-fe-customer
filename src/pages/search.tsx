import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

import { MAIN_LAYOUT } from "~/constants";
import useTranslate from "~/hooks/useLocales";
import SearchScreen from "~/components/pages/Search";

const Search: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("search.title")}</title>
    </Head>
    <SearchScreen />
  </>
);
Search.layout = MAIN_LAYOUT;

export default Search;
