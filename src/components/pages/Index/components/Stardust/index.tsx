import React, { memo } from "react";

import Carousel from "./Carousel";

import styles from "./Stardust.module.scss";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { Skeleton } from "antd";

const Stardust = () => {
  const { status: userStatus } = useAppSelector((state) => state.user);
  const isLoading =
    userStatus === ASYNC_STATUS.LOADING || userStatus === ASYNC_STATUS.IDLE;

  return (
    <section className={styles["stardust"]}>
      <div className="container">
        {isLoading ? (
          <>
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
          </>
        ) : (
          <Carousel />
        )}
      </div>
    </section>
  );
};

export default memo(Stardust);
