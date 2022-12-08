import React from "react";

import MainLayout from "~layouts/MainLayout";

import Stardust from "./components/Stardust";
import Category from "./components/Categories";
import Products from "./components/Products";
import AdsImages from "./components/AdsImages";

const Index = () => {
  return (
    <MainLayout>
      <>
        <Stardust />
        <Category />
        <Products />
        <AdsImages />
      </>
    </MainLayout>
  );
};

export default Index;
