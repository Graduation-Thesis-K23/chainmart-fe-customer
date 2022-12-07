import ProductDetails from "../mocks/ProductDetails";

const getProductDetail = async (slug: string) => {
  // call api later

  // result type
  /*
  {
    id: number,
    name: string,
    price: number,
    ignorePrice: number,
    star: number,
    sold: number,
    images: string[],
    slug: string,
    ...
  }
  */

  const result = ProductDetails.find((product) => product.slug === slug);

  return result;
};

export default getProductDetail;
