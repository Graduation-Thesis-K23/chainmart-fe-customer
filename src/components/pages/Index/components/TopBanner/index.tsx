import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "antd";

import styles from "./TopBanner.module.scss";
import adsList from "~/sub-categories/ads";

const TopBanner = () => {
  return (
    <section className={styles["banner"]}>
      <div className="container">
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
      </div>
    </section>
  );
};

export default TopBanner;
