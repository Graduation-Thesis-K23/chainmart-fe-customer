import ProductsList from "../mocks/ProductsList";

const getProducts = async () => {
  // call api later

  // result type
  /*
  [
    {
      params: {
        slug: string
      }
    },
    ...
  ]
  */

  const result = ProductsList.map((product) => {
    return {
      params: {
        slug: product.slug,
      },
    };
  });

  return result;
};

export default getProducts;
