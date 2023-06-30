import React, { memo, useState } from "react";
import { Divider, Col, Row } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import classNames from "classnames";

import Images from "./Images";
import Parameter from "./Parameter";
import Quantity from "./Quantity";
import Specifications from "./Specifications";
import Description from "./Description";

import styles from "./MainInformation.module.scss";
import { ICart } from "~/interfaces";
import { addItemCart, useAppDispatch, useAppSelector } from "~/redux";
import Translate from "~/components/commons/Translate";

const MainInformation = () => {
  const { data } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setAddCartSuccess] = useState(false);

  const handleAddToCart = () => {
    const itemCart: ICart = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: data.images[0],
      maxQuantity: 5,
      quantity,
    };

    dispatch(addItemCart(itemCart));

    setAddCartSuccess(true);

    setTimeout(() => {
      setAddCartSuccess(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    const itemCart: ICart = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: data.images[0],
      maxQuantity: 5,
      quantity,
    };

    dispatch(addItemCart(itemCart));

    // redirect to cart page
    router.push("/cart");
  };

  return (
    <>
      <div className={styles["main_information"]}>
        <div className="container">
          <Row className={styles["main_information_top"]} gutter={[24, 12]}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <Images images={data.images} />
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className={styles["main_information-right"]}>
                <Parameter
                  name={data.name}
                  star={3}
                  sold={3}
                  price={data.price}
                  sale={data.sale}
                />
                <Divider />
                <Quantity
                  maxQuantity={5}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <div className={styles["main_information-right-checkout"]}>
                  <button
                    className={styles["main_information-right-checkout-buy"]}
                    onClick={handleBuyNow}
                  >
                    <Translate textKey="product.buyNow" />
                  </button>
                  <button
                    className={styles["main_information-right-checkout-cart"]}
                    onClick={handleAddToCart}
                  >
                    <Translate textKey="product.addToCart" />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <div className={styles["description-inner"]}>
            <div className={styles["description-title"]}>
              <Translate textKey="product.specifications" />
            </div>
            <Specifications specifications={JSON.parse(data.specifications)} />
            <div className={styles["description-title"]}>
              <Translate textKey="product.description" />
            </div>
            <Description description={data.description} />
          </div>
        </div>
      </div>

      <div
        className={classNames(styles["cart_modal"], {
          [styles["show"]]: cartSuccess,
        })}
      >
        <div className={styles["cart_modal_content"]}>
          <CheckCircleOutlined className={styles["cart_modal_content_icon"]} />
          <p className={styles["cart_modal_content_text"]}>
            <Translate textKey="product.addToCartSuccess" />
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(MainInformation);
