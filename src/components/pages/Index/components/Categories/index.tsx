// libs
import React from "react";
// components
import CategoriesList from "./CategoriesList";
import SectionHeader from "../SectionHeader";
// others
import styles from "./Categories.module.scss";

const Categories = () => {
  return (
    <div className={styles["categories-wrapper"]}>
      <div className={styles["categories-wrapper-inner"]}>
        <div className={styles["categories-content"]}>
          <SectionHeader topicKey="categories.header" />
          <CategoriesList />
        </div>
      </div>
    </div>
  );
};

export default Categories;
