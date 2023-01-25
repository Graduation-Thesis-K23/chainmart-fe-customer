import React from "react";
import Link from "next/link";

import ProductsList from "../ProductsList";

import styles from "./Products.module.scss";
import useTranslate, { default as translate } from "~/hooks/useTranslate";

const Products = () => {
  return (
    <div className={styles["products"]}>
      <div className="container">
        <div className={styles["title"]}>
          <div className={styles["title_text"]}>
            {useTranslate("products.header")}
          </div>
        </div>

        <div className={styles["products-content"]}>
          <ProductsList />
          <div className={styles["products-all"]}>
            <Link
              href={"/products"}
              prefetch={false}
              className={styles["products-all-btn"]}
            >
              <span>{translate("products.viewAll")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
