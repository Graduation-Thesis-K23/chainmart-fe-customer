import React, { createContext, useContext, useMemo, useState } from "react";

import { IProductDetail } from "~/shared/interfaces";

interface IProductContext {
  productDetail: IProductDetail;
  setProductDetail: React.Dispatch<React.SetStateAction<IProductDetail>>;
}

const ProductDetailContext = createContext<IProductContext>({
  productDetail: {} as IProductDetail,
  setProductDetail: () => {},
});

export const ProductDetailProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [productDetail, setProductDetail] = useState<IProductDetail>(
    {} as IProductDetail
  );

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
