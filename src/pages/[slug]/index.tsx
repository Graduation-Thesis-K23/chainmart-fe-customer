import React, { useEffect } from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import ProductPage from "~/components/pages/Product";
import Loading from "~/components/atomics/Loading";

import { IParams } from "~/interfaces";
import { NextPageWithLayout } from "../_app";
import { MAIN_LAYOUT } from "~/constants";
import instance from "~/services/axios-instance";
import {
  ProductType,
  setProduct,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import getS3Image from "~/helpers/get-s3-image";

const Product: NextPageWithLayout<{
  product: ProductType;
}> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);

  return (
    <>
      {status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Head>
            <title>{product.name}</title>
            <meta name="title" content={product.name} />
            <meta name="description" content={product.description} />
            <meta property="og:title" content={product.name} />
            <meta property="og:description" content={product.description} />
            <meta property="og:image" content={getS3Image(product.images[0])} />
          </Head>
          <ProductPage />
        </>
      )}
    </>
  );
};

Product.layout = MAIN_LAYOUT;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams;

  const product = await instance("/api/products/slug/" + slug);

  return {
    props: { product },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths: { params: { slug: string } }[] = [];
  // call api later
  try {
    const productList: ProductType[] = await instance.get("/api/products");
    paths = productList.map((product) => {
      return {
        params: {
          slug: product.slug,
        },
      };
    });
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export default Product;
