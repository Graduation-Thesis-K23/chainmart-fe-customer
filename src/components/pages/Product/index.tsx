import React from "react";

import useProductDetail from "~/contexts/ProductDetailContext";
import MainLayout from "~/components/layouts/MainLayout";

const ProductPage = () => {
  const { productDetail } = useProductDetail();

  return (
    <MainLayout>
      <div>{productDetail.name}</div>
    </MainLayout>
  );
};

export default ProductPage;
