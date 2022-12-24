import React from "react";

import Loading from "~/components/atomics/Loading";
import MainLayout from "~layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Search: NextPageWithLayout = () => {
  return <Loading />;
};

Search.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Search;
