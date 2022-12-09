import ProductDetails from "../mocks/ProductDetails";

const getProductDetail = async (slug: string) => {
  // call api here
  const result = ProductDetails.find((product) => product.slug === slug);

  return result;
};

export default getProductDetail;
