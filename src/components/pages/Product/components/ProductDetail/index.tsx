import React, { memo } from "react";
import { Col, Row } from "antd";

import Familiar from "./Familiar";
import MainInformation from "./MainInformation";
import Rating from "./Rating";

import styles from "./ProductDetail.module.scss";
import { useAppSelector } from "~/redux";

const ProductDetail = () => {
  const { data } = useAppSelector((state) => state.product);
  return (
    <>
      <MainInformation />
      <div className={styles["stakeholder"]}>
        <div className="container">
          <Row gutter={[20, 12]} className={styles["stakeholder_inner"]}>
            <Col xs={24} sm={24} md={17} lg={19} xl={19}>
              <Rating />
            </Col>
            <Col xs={24} sm={24} md={7} lg={5} xl={5}>
              <Familiar id={data.id} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default memo(ProductDetail);
