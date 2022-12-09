import React, { useEffect } from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import ProductPage from "~/components/pages/Product";

import { IParams } from "~/interfaces";
import { IProductDetail } from "~/shared/interfaces";
import { getProducts } from "~/apis/Home";
import { getProductDetail } from "~/apis/Product";
import useProductDetail from "~/contexts/ProductDetailContext";

const Product: React.FC<{
  product: IProductDetail;
}> = ({ product }) => {
  const { setProductDetail } = useProductDetail();

  useEffect(() => {
    setProductDetail(product);
  }, [product, setProductDetail]);

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="title" content={product.name} />
        <meta name="description" content={product.name} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.name} />
        <meta property="og:image" content={product.image} />
      </Head>
      <ProductPage />
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams;

  const product = await getProductDetail(slug);

  return {
    props: { product },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const paths = await getProducts();

  return {
    paths,
    fallback: "blocking",
  };
};

export default Product;
