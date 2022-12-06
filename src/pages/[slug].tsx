import React from "react";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

import ProductList from "~/mocks/ProductsList";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
}

const Product: React.FC<{
  product: IProduct;
}> = ({ product }) => {
  return <div>{product.name}</div>;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams;

  // get product by slug
  const product = ProductList.find((item) => item.slug === slug);

  return {
    props: { product },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const paths = ProductList.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Product;
