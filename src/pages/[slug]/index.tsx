import React, { useEffect } from "react";
import { GetStaticPropsContext } from "next";

import ProductPage from "~pages/Product";

import { IParams } from "~/interfaces";
import { IProductDetail } from "~/shared/interfaces";
import { getProducts, getProductDetail } from "~/apis/Home";
import useProductDetail from "~/contexts/ProductDetailContext";

const Product: React.FC<{
  product: IProductDetail;
}> = ({ product }) => {
  const { setProductDetail } = useProductDetail();

  useEffect(() => {
    setProductDetail(product);
  }, [product, setProductDetail]);

  return <ProductPage />;
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
    fallback: false,
  };
};

export default Product;
