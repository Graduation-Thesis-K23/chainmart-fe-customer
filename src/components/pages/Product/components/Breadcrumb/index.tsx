import React from "react";
import { Breadcrumb } from "antd";

import styles from "./Breadcrumb.module.scss";

const ProductBreadcrumb = () => {
  return (
    <div className={styles["product-breadcrumb"]}>
      <div className={styles["product-breadcrumb-inner"]}>
        <Breadcrumb>
          <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
          <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
          <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
