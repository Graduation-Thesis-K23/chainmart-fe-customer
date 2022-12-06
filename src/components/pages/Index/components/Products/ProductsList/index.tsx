import React from "react";

import ProductCard from "./ProductCard";

import productsList from "~/mocks/ProductsList";
import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  return (
    <ul className={styles["products-list"]}>
      {productsList.map((item) => (
        <li key={item.id} className={styles["products-list-item"]}>
          <ProductCard {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
