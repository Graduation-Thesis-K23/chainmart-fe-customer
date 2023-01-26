import React, { memo } from "react";
import { Breadcrumb } from "antd";

import styles from "./Breadcrumb.module.scss";

const ProductBreadcrumb = () => {
  return (
    <div className={styles["breadcrumb"]}>
      <div className="container">
        <div className={styles["breadcrumb_inner"]}>
          <Breadcrumb>
            <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
            <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
            <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductBreadcrumb);
