import React, { createContext, useContext, useMemo, useState } from "react";

import { IProduct } from "~/shared/interfaces";

interface IProductContext {
  productDetail: IProduct;
  setProductDetail: (product: IProduct) => void;
}

const ProductDetailContext = createContext<IProductContext>({
  productDetail: {} as IProduct,
  setProductDetail: () => {},
});

export const ProductDetailProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [productDetail, setProductDetail] = useState<IProduct>({} as IProduct);

  const value: IProductContext = useMemo(
    () => ({ productDetail, setProductDetail }),
    [productDetail, setProductDetail]
  );

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
};

const useProductDetail = () => useContext(ProductDetailContext);

export default useProductDetail;
