import React, { FC, memo } from "react";

const ProductList: FC<{
  keyword: string;
  categories: string;
  minPrice: string;
  maxPrice: string;
  order: string;
}> = ({ keyword, categories, minPrice, maxPrice, order }) => {
  return (
    <div>
      <div>keyword: {keyword}</div>
      <div>categories: {categories}</div>
      <div>minPrice: {minPrice}</div>
      <div>maxPrice: {maxPrice}</div>
      <div>order: {order}</div>
    </div>
  );
};

export default memo(ProductList);
