import React, { useState } from "react";
import { Divider, message, Modal } from "antd";

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
    id,
    slug,
  } = useProductDetail().productDetail;

  const { cart, setCart } = useCart();

  const [messageApi, contextHolder] = message.useMessage();

  const buyNowText = useTranslate("product.buyNow");
  const addToCartText = useTranslate("product.addToCart");
  const addToCartTextSuccess = useTranslate("product.addToCartSuccess");
  const productSpecifications = useTranslate("product.specifications");
  const productDescription = useTranslate("product.description");
  const notSelect = useTranslate("product.notSelect");

  const [select, setSelect] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setAddCartSuccess] = useState(false);

  const handleAddToCart = () => {
    let classify = "";

    const optionsKey = Object.keys(options);
    for (const optionKey in optionsKey) {
      const key: number = +optionKey.trim();

      const option = optionsKey[key];

      if (select[option]) {
        classify += select[option] + " ";
      } else {
        return;
      }
    }

    const itemCart: ICart = {
      id,
      name,
      slug,
      price,
      image,
      maxQuantity,
      quantity,
      classify: classify.trim(),
    };

    const temp = cart;

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

    setAddCartSuccess(true);
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
          <Modal
            open={cartSuccess}
            onCancel={() => setAddCartSuccess(false)}
            footer={[]}
            mask={false}
            closable={false}
            centered
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
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
