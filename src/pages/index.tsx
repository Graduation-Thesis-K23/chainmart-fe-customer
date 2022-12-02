import React from "react";

import IndexScreen from "~pages/Index";

const Index = () => <IndexScreen />;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Index;
