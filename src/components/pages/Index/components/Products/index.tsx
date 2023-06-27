import React from "react";
import Link from "next/link";

import ProductsList from "../ProductsList";

import styles from "./Products.module.scss";
import Translate from "~/components/commons/Translate";

const Products = () => {
  return (
    <section className={styles["products"]}>
      <div className="container">
        <div className={styles["title"]}>
          <div className={styles["title_text"]}>
            <Translate textKey="products.header" />
          </div>
        </div>
        <div className={styles["products-content"]}>
          <ProductsList />
          <div className={styles["products-all"]}>
            <Link
              href={"/search?keyword="}
              prefetch={false}
              className={styles["products-all-btn"]}
            >
              <span>
                <Translate textKey="products.viewAll" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
