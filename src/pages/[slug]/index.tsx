import React, { useEffect } from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import ProductPage from "~/components/pages/Product";
import { IParams } from "~/shared";
import { NextPageWithLayout } from "../_app";
import { MAIN_LAYOUT } from "~/constants";
import instance from "~/apis/axios-instance";
import { setProduct, useAppDispatch } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";
import { ProductType } from "~/shared";

interface ProductProps {
  product: ProductType;
}

const Product: NextPageWithLayout<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="title" content={product.name} />
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={getS3Image((product.images || [])[0])}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Head>
      <ProductPage />
    </>
  );
};

Product.layout = MAIN_LAYOUT;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams;

  const product = await instance.get("/api/products/slug/" + slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: slug,
      product,
    },
    revalidate: 1,
  };
};

interface Params {
  params: {
    slug: string;
  };
}

export const getStaticPaths = async () => {
  let paths: Params[] = [];
  // call api later
  try {
    paths = await instance.get("/api/products/static-paths");
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: true,
  };
};

export default Product;
