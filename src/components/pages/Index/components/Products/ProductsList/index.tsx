import React from "react";

import ProductCard from "./ProductCard";

import productsList from "~/mocks/ProductsList";
import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  return (
    <div className={styles["products-list"]}>
      {productsList.map((item) => (
        <div key={item.id} className={styles["products-list-item"]}>
          <ProductCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
