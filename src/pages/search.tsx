import React from "react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { MAIN_LAYOUT } from "~/constants";
const SearchScreen = dynamic(() => import("~pages/Search"), { ssr: false });
import useTranslate from "~/hooks/useLocales";

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
