import React, { useState } from "react";
import Image from "next/image";
import { Rate, Image as ImageAntd, Divider } from "antd";
import Carousel from "react-multi-carousel";

import ImageSlider from "./ImageSlider";

import styles from "./MainInformation.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";
import { convertPrice, discount } from "~/helpers";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 6,
  },
};

const MainInformation = () => {
  const { name, image, images, star, price, sold, ignorePrice } =
    useProductDetail().productDetail;

  const [imageShow, setImageShow] = useState<string>(image);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      {image && (
        <div className={styles["main-information"]}>
          <div className={styles["main-information-inner"]}>
            <div className={styles["main-information-left"]}>
              <div className={styles["main-information-left-image"]}>
                <Image
                  src={imageShow || image}
                  alt={name}
                  width={450}
                  height={450}
                  objectFit="contain"
                  onClick={() => setVisible(true)}
                />
                <ImageAntd
                  preview={{
                    visible,
                    src: imageShow || image,
                    onVisibleChange: (value) => {
                      setVisible(value);
                    },
                  }}
                />
              </div>
              <div className={styles["main-information-left-controller"]}>
                <Carousel responsive={responsive}>
                  {images.map((i, index) => (
                    <ImageSlider
                      key={index}
                      src={i}
                      onMouseEnter={() => setImageShow(i)}
                    />
                  ))}
                </Carousel>
              </div>
            </div>
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
                  {sold}
                </span>
              </div>
              <Divider />
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
              <div>
                <div>
                  <span>Nhom mau</span>
                </div>
                <div>
                  <span>Nhom mau</span>
                </div>
              </div>
              <div>
                <div>
                  <span>Nhom mau</span>
                </div>
                <div>
                  <span>Nhom mau</span>
                </div>
              </div>
              <div className={styles["main-information-right-checkout"]}>
                <button
                  className={styles["main-information-right-checkout-buy"]}
                >
                  Mua ngay
                </button>
                <button
                  className={styles["main-information-right-checkout-cart"]}
                >
                  Them vao gio hang
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
