import RatingProduct from "../mocks/RatingProduct";

const getRatingProduct = (id: number) => {
  const product = RatingProduct.filter((product) => product.productId === id);

  return product;
};

export default getRatingProduct;
