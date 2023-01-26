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
import useProductDetail from "~/contexts/ProductDetailContext";
import useTranslate from "~/hooks/useTranslate";
import useCart from "~/contexts/CartContext";
import { ICart } from "~/shared/interfaces";

const MainInformation = () => {
  const { productDetail } = useProductDetail();

  const { cart, setCart } = useCart();

  const buyNowText = useTranslate("product.buyNow");
  const addToCartText = useTranslate("product.addToCart");
  const productSpecifications = useTranslate("product.specifications");
  const productDescription = useTranslate("product.description");

  const [select, setSelect] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setAddCartSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleAddToCart = () => {
    let classify = "";

    const optionsKey = Object.keys(productDetail.options);
    for (const optionKey in optionsKey) {
      const key: number = +optionKey.trim();

      const option = optionsKey[key];

      if (select[option]) {
        classify += select[option] + " ";
      } else {
        setWarning(true);
        return;
      }
    }

    const itemCart: ICart = {
      id: productDetail.id,
      name: productDetail.name,
      slug: productDetail.slug,
      price: productDetail.price,
      image: productDetail.image,
      maxQuantity: productDetail.maxQuantity,
      quantity,
      classify: classify.trim(),
    };

    const temp: ICart[] = [...cart];

    const isExist = temp.find(
      (product) =>
        product.id === itemCart.id &&
        product.maxQuantity >= product.quantity + itemCart.quantity
    );

    if (isExist) {
      temp.map((product) => {
        if (
          product.classify === itemCart.classify &&
          product.id === itemCart.id
        ) {
          product.quantity += itemCart.quantity;
        }
      });
    } else {
      temp.push(itemCart);
    }

    setCart(temp);
    setSelect({});

    setAddCartSuccess(true);

    setTimeout(() => {
      setAddCartSuccess(false);
    }, 2000);
  };

  return (
    <>
      {productDetail.name && (
        <div className={styles["main_information"]}>
          <div className="container">
            <Row className={styles["main_information_top"]} gutter={[24, 12]}>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Images
                  image={productDetail.image}
                  images={productDetail.images}
                />
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <div className={styles["main_information-right"]}>
                  <Parameter
                    name={productDetail.name}
                    star={productDetail.star}
                    sold={productDetail.sold}
                    price={productDetail.price}
                    ignorePrice={productDetail.ignorePrice}
                  />
                  <Divider />
                  <Optional
                    options={productDetail.options}
                    select={select}
                    setSelect={setSelect}
                    warning={warning}
                    setWarning={setWarning}
                  />
                  <Divider />
                  <Quantity
                    maxQuantity={productDetail.maxQuantity}
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
                      onClick={() => handleAddToCart()}
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
              <Specifications specifications={productDetail.specifications} />
              <div className={styles["description-title"]}>
                {productDescription}
              </div>
              <Description description={productDetail.description} />
            </div>
          </div>
        </div>
      )}
      <div
        className={classNames(styles["cart_modal"], {
          [styles["show"]]: cartSuccess,
        })}
      >
        <div className={styles["cart_modal_content"]}>
          <CheckCircleOutlined className={styles["cart_modal_content_icon"]} />
          <p className={styles["cart_modal_content_text"]}>
            {useTranslate("product.addToCartSuccess")}
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(MainInformation);
