import React, { memo, useState } from "react";
import { Divider, Col, Row } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";

import Optional from "./Optional";
import Images from "./Images";
import Parameter from "./Parameter";
import Quantity from "./Quantity";
import Specifications from "./Specifications";
import Description from "./Description";

import styles from "./MainInformation.module.scss";
import useTranslate from "~/hooks/useLocales";
import useCart from "~/contexts/CartContext";
import { ICart } from "~/interfaces";
import { useAppSelector } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const MainInformation = () => {
  const { cart, setCart } = useCart();

  const { data } = useAppSelector((state) => state.product);

  const buyNowText = useTranslate("product.buyNow");
  const addToCartText = useTranslate("product.addToCart");
  const productSpecifications = useTranslate("product.specifications");
  const productDescription = useTranslate("product.description");
  const addToCartSuccess = useTranslate("product.addToCartSuccess");

  const [select, setSelect] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setAddCartSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleAddToCart = () => {
    const optionsNumber = JSON.parse(data.options).length;
    const selectedNumber = Object.keys(select).length;

    if (optionsNumber !== selectedNumber) {
      setWarning(true);
      return;
    }

    const itemCart: ICart = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: getS3Image(data.images[0]),
      maxQuantity: 5,
      quantity,
      select,
    };

    const temp: ICart[] = [...cart];

    const isExist = temp.find(
      (product) =>
        product.id === itemCart.id &&
        product.maxQuantity >= product.quantity + itemCart.quantity &&
        Object.entries(product.select).toString() ===
          Object.entries(itemCart.select).toString()
    );

    if (isExist) {
      isExist.quantity += itemCart.quantity;
    } else {
      temp.push(itemCart);
    }

    setCart(temp);
    setSelect({});

    setAddCartSuccess(true);

    setTimeout(() => {
      setAddCartSuccess(false);
    }, 1000);
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
                <Optional
                  options={JSON.parse(data.options)}
                  select={select}
                  setSelect={setSelect}
                  warning={warning}
                  setWarning={setWarning}
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
                  >
                    {buyNowText}
                  </button>
                  <button
                    className={styles["main_information-right-checkout-cart"]}
                    onClick={handleAddToCart}
                  >
                    {addToCartText}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <div className={styles["description-inner"]}>
            <div className={styles["description-title"]}>
              {productSpecifications}
            </div>
            <Specifications specifications={JSON.parse(data.specifications)} />
            <div className={styles["description-title"]}>
              {productDescription}
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
            {addToCartSuccess}
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(MainInformation);
