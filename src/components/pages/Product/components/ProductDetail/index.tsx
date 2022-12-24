import React from "react";
import Familiar from "./Familiar";

import MainInformation from "./MainInformation";
import Rating from "./Rating";

import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  return (
    <>
      <MainInformation />
      <div className={styles["stakeholder"]}>
        <div className={styles["stakeholder-inner"]}>
          <Rating />
          <Familiar />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
