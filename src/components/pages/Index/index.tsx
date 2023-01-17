import React, { memo } from "react";

import Stardust from "./components/Stardust";
import Category from "./components/Categories";
import Products from "./components/Products";
import AdsImages from "./components/AdsImages";

const Index = () => {
  return (
    <>
      <Stardust />
      <Category />
      <Products />
      <AdsImages />
    </>
  );
};

export default memo(Index);
