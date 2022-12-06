import React from "react";

import Loading from "~/components/atomics/Loading";

const Search = () => {
  return <Loading />;
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Search;
