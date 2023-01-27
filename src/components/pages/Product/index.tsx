import React, { memo } from "react";

import ProductBreadcrumb from "./components/Breadcrumb";
import ProductDetail from "./components/ProductDetail";

const ProductPage = () => {
  return (
    <>
      <ProductBreadcrumb />
      <ProductDetail />
    </>
  );
};

export default memo(ProductPage);
