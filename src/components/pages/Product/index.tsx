import React, { memo } from "react";

import ProductBreadcrumb from "./components/Breadcrumb";
import ProductDetail from "./components/ProductDetail";
import { useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";

const ProductPage = () => {
  const { status } = useAppSelector((state) => state.product);

  if (status !== ASYNC_STATUS.SUCCEED) {
    return <></>;
  }
  return (
    <>
      <ProductBreadcrumb />
      <ProductDetail />
    </>
  );
};

export default memo(ProductPage);
