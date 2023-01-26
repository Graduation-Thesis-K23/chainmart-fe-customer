import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "antd";

import styles from "./TopBanner.module.scss";
import topBanner from "~/dataSources/TopBanner";

const TopBanner = () => {
  return (
    <section className={styles["banner"]}>
      <div className="container">
        <Row gutter={[16, 16]}>
          {topBanner.map((item) => (
            <Col key={item.key} xs={24} sm={12} md={12} lg={6}>
              <Link
                className={styles["banner_link"]}
                href={item.href}
                aria-label={item.text}
              >
                <Image
                  className={styles["banner_image"]}
                  src={item.src}
                  alt={item.text}
                  width={490}
                  height={249}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TopBanner;
