import React from "react";
import Link from "next/link";

import SectionHeader from "../SectionHeader";
import ProductsList from "./ProductsList";

import styles from "./Products.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const Products = () => {
  return (
    <div className={styles["products"]}>
      <div className={styles["products-inner"]}>
        <div className={styles["products-content"]}>
          <SectionHeader topicKey="products.header" />
          <ProductsList />
          <div className={styles["products-all"]}>
            <Link href={"/products"}>
              <a className={styles["products-all-btn"]}>
                {translate("products.viewAll")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
