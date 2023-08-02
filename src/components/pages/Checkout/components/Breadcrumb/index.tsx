import React from "react";
import Image from "next/image";

import breadcrumb from "~/assets/breadcrumb/breadcrumb.webp";
import styles from "./Breadcrumb.module.scss";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { Skeleton } from "antd";

const Breadcrumb = () => {
  const { status } = useAppSelector((state) => state.user);

  const isLoading =
    status === ASYNC_STATUS.LOADING || status === ASYNC_STATUS.IDLE;

  return (
    <div className={styles["breadcrumb"]}>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: 60,
            overflow: "hidden",
          }}
        >
          <Skeleton.Input active size="large" block />
          <Skeleton.Input active size="large" block />
        </div>
      ) : (
        <>
          <Image
            className={styles["breadcrumb_image"]}
            src={breadcrumb}
            alt="breadcrumb"
            priority
          />
          <div className={styles["breadcrumb_overlay"]}></div>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
