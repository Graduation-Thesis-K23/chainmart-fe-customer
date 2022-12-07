import React from "react";

import useProductDetail from "~/contexts/ProductDetailContext";

const ProductPage = () => {
  const { productDetail } = useProductDetail();

  return (
    <div>
      {productDetail.name}
      {productDetail.price}
    </div>
  );
};

export default ProductPage;
