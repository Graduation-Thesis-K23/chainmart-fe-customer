import React from "react";

import MainLayout from "~layouts/MainLayout";

import ProductBreadcrumb from "./components/Breadcrumb";
import ProductDetail from "./components/ProductDetail";

const ProductPage = () => {
  return (
    <MainLayout>
      <>
        <ProductBreadcrumb />
        <ProductDetail />
      </>
    </MainLayout>
  );
};

export default ProductPage;
