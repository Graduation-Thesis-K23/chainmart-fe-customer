import React, { useState } from "react";
import { Divider, message } from "antd";

import Optional from "./Optional";
import Images from "./Images";
import Parameter from "./Parameter";
import Quantity from "./Quantity";
import Specifications from "./Specifications";
import Description from "./Description";

import styles from "./MainInformation.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";
import useTranslate from "~/hooks/useTranslate";

const MainInformation = () => {
  const {
    name,
    image,
    images,
    star,
    price,
    sold,
    ignorePrice,
    options,
    maxQuantity,
    specifications,
    description,
  } = useProductDetail().productDetail;

  const [messageApi, contextHolder] = message.useMessage();

  const buyNowText = useTranslate("product.buyNow");
  const addToCartText = useTranslate("product.addToCart");
  const addToCartTextSuccess = useTranslate("product.addToCartSuccess");
  const productSpecifications = useTranslate("product.specifications");
  const productDescription = useTranslate("product.description");

  const [select, setSelect] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    messageApi.open({
      type: "success",
      content: addToCartTextSuccess,
    });
  };

  return (
    <>
      {contextHolder}
      {image && (
        <div className={styles["main-information"]}>
          <div className={styles["main-information-inner"]}>
            <Images image={image} images={images} />
            <div className={styles["main-information-right"]}>
              <Parameter
                name={name}
                star={star}
                sold={sold}
                price={price}
                ignorePrice={ignorePrice}
              />
              <Divider />
              <Optional
                options={options}
                select={select}
                setSelect={setSelect}
              />
              <Divider />
              <Quantity
                maxQuantity={maxQuantity}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <div className={styles["main-information-right-checkout"]}>
                <button
                  className={styles["main-information-right-checkout-buy"]}
                >
                  {buyNowText}
                </button>
                <button
                  className={styles["main-information-right-checkout-cart"]}
                  onClick={() => handleAddToCart()}
                >
                  {addToCartText}
                </button>
              </div>
            </div>
          </div>

          <div className={styles["description-inner"]}>
            <div className={styles["description-title"]}>
              {productSpecifications}
            </div>
            <Specifications specifications={specifications} />
            <div className={styles["description-title"]}>
              {productDescription}
            </div>
            <Description description={description} />
          </div>
        </div>
      )}
    </>
  );
};

export default MainInformation;
