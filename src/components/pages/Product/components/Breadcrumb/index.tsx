import React, { memo } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";

import styles from "./Breadcrumb.module.scss";
import { useAppSelector } from "~/redux";
import useTranslate from "~/hooks/useLocales";

const ProductBreadcrumb = () => {
  const { data } = useAppSelector((state) => state.product);

  const home = useTranslate("home");

  return (
    <div className={styles["breadcrumb"]}>
      <div className="container">
        <div className={styles["breadcrumb_inner"]}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">{home}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/"> {data.category}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductBreadcrumb);
