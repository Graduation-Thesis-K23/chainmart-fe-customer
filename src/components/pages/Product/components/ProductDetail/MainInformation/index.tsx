import React, { useState } from "react";
import { Rate, Divider } from "antd";

import Optional from "./Optional";
import Images from "./Images";

import styles from "./MainInformation.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";
import { convertPrice, discount } from "~/helpers";
import useTranslate from "~/hooks/useTranslate";
import { INCREASE, DECREASE } from "~/constants";

const MainInformation = () => {
  const { name, image, images, star, price, sold, ignorePrice, options } =
    useProductDetail().productDetail;

  const soldText = useTranslate("products.sold");
  const buyNowText = useTranslate("product.buyNow");
  const addToCartText = useTranslate("product.addToCart");

  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (action: string) => {
    if (action === INCREASE) {
      setQuantity((prev) => prev + 1);
    } else if (action === DECREASE && quantity != 1) {
      setQuantity((prev) => prev - 1);
    } else {
      console.log("disable -");
    }
  };

  return (
    <>
      {image && (
        <div className={styles["main-information"]}>
          <div className={styles["main-information-inner"]}>
            <Images image={image} images={images} />
            <div className={styles["main-information-right"]}>
              <h1 className={styles["main-information-right-title"]}>{name}</h1>
              <div className={styles["main-information-right-parameter"]}>
                <Rate
                  className={styles["main-information-right-parameter-star"]}
                  allowHalf
                  disabled
                  value={star}
                />
                <span
                  className={styles["main-information-right-parameter-sold"]}
                >
                  {sold + " " + soldText}
                </span>
              </div>
              <div className={styles["main-information-right-value"]}>
                <span className={styles["main-information-right-value-price"]}>
                  {convertPrice(price)} đ
                </span>
                <span
                  className={
                    styles["main-information-right-value-price-ignore"]
                  }
                >
                  {convertPrice(ignorePrice)} đ
                </span>
                <span
                  className={styles["main-information-right-value-discount"]}
                >
                  {discount(price, ignorePrice)}%
                </span>
              </div>
              <Divider />
              <Optional options={options} />
              <Divider />
              <div className={styles["main-information-right-quantity"]}>
                <div
                  className={styles["main-information-right-quantity-title"]}
                >
                  <span>Số lượng</span>
                </div>
                <div
                  className={styles["main-information-right-quantity-control"]}
                >
                  <button
                    className={
                      styles["main-information-right-quantity-control-sub"]
                    }
                    onClick={() => handleChangeQuantity(DECREASE)}
                  >
                    -
                  </button>
                  <span
                    className={
                      styles["main-information-right-quantity-control-value"]
                    }
                  >
                    {quantity}
                  </span>
                  <button
                    className={
                      styles["main-information-right-quantity-control-add"]
                    }
                    onClick={() => handleChangeQuantity(INCREASE)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles["main-information-right-checkout"]}>
                <button
                  className={styles["main-information-right-checkout-buy"]}
                >
                  {buyNowText}
                </button>
                <button
                  className={styles["main-information-right-checkout-cart"]}
                >
                  {addToCartText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainInformation;
