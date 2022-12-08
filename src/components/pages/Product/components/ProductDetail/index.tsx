import React from "react";

import MainInformation from "./MainInformation";

import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  return (
    <div className={styles["product-detail"]}>
      <MainInformation />
    </div>
  );
};

export default ProductDetail;
