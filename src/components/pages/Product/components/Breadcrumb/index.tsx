import React, { memo } from "react";
import { Breadcrumb, Skeleton } from "antd";
import Link from "next/link";

import styles from "./Breadcrumb.module.scss";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import Translate from "~/components/commons/Translate";

const ProductBreadcrumb = () => {
  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;
  /* {
     isLoading ? <></> : <></>;
   } */
  const { data } = useAppSelector((state) => state.product);

  return (
    <div className={styles["breadcrumb"]}>
      <div className="container">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 400,
              height: 60,
              overflow: "hidden",
            }}
          >
            <Skeleton.Input active size="small" block />
          </div>
        ) : (
          <div className={styles["breadcrumb_inner"]}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <Translate textKey="home" />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href={"/search?keyword=&categories=" + data.category}>
                  <Translate textKey={data.category} />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductBreadcrumb);
