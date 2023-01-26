import React, { memo } from "react";

import Stardust from "./components/Stardust";
import TopCategories from "./components/TopCategories";
import TopBanner from "./components/TopBanner";
import Products from "./components/Products";

const Index = () => {
  return (
    <>
      <Stardust />
      <TopCategories />
      <TopBanner />
      <Products />
    </>
  );
};

export default memo(Index);
