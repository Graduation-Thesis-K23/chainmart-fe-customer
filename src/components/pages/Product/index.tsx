import React from "react";
import Head from "next/head";

import useProductDetail from "~/contexts/ProductDetailContext";
import MainLayout from "~/components/layouts/MainLayout";

const ProductPage = () => {
  const { productDetail } = useProductDetail();

  return (
    <>
      <Head>
        <title>{productDetail.name}</title>
        <meta name="title" content={productDetail.name} />
        <meta name="description" content={productDetail.name} />
        <meta property="og:title" content={productDetail.name} />
        <meta property="og:description" content={productDetail.name} />
        {productDetail.images && (
          <meta property="og:image" content={productDetail.images[0]} />
        )}
      </Head>
      <MainLayout>
        <div>{productDetail.name}</div>
      </MainLayout>
    </>
  );
};

export default ProductPage;
