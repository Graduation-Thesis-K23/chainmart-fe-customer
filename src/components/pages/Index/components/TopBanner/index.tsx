import React from "react";
import Image from "next/image";
import { Col, Row, Skeleton } from "antd";

import styles from "./TopBanner.module.scss";
import adsList from "~/sub-categories/ads";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

const TopBanner = () => {
  const { status: userStatus } = useAppSelector((state) => state.user);
  const isLoading =
    userStatus === ASYNC_STATUS.LOADING || userStatus === ASYNC_STATUS.IDLE;

  return (
    <section className={styles["banner"]}>
      <div className="container">
        {isLoading ? (
          <div
            style={{
              width: "1200px",
              height: "180px",
              overflow: "hidden",
            }}
          >
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "286px",
                  height: "180px",
                  overflow: "hidden",
                  marginRight: "12px",
                  display: "inline-block",
                }}
              >
                <Skeleton.Input size="large" block />
                <Skeleton.Input size="large" block />
                <Skeleton.Input size="large" block />
                <Skeleton.Input size="large" block />
                <Skeleton.Input size="large" block />
              </div>
            ))}
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {adsList.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={12} lg={6}>
                <Image
                  className={styles["banner_image"]}
                  src={item.src}
                  alt={`category-${item.id}`}
                  width={490}
                  height={249}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
};

export default TopBanner;
