import React from "react";

import MainLayout from "~/components/layouts/MainLayout";
import Stardust from "./components/Stardust";
import Category from "./components/Categories";
import Products from "./components/Products";

import styles from "./Index.module.scss";

const Index = () => {
  return (
    <MainLayout>
      <div className={styles["index"]}>
        <Stardust />
        <Category />
        <Products />
      </div>
    </MainLayout>
  );
};

export default Index;
