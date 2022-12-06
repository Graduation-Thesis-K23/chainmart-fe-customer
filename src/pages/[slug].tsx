import React from "react";
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <p>Post: {slug}</p>;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Product;
