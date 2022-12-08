import React, { useRef, useState } from "react";
import Image from "next/image";
import { Rate, Image as ImageAntd } from "antd";
import Carousel from "react-multi-carousel";
import { CarouselRef } from "antd/lib/carousel";

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
              <div>
                <Rate allowHalf defaultValue={star} />
                <span>{sold} đã bán</span>
              </div>
              <div>
                <p>{convertPrice(price)}đ</p>
                <p>{convertPrice(ignorePrice)}đ</p>
                <p>{discount(price, ignorePrice)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainInformation;
