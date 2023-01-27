import React, { useState, memo } from "react";
import { Image as ImageAntd } from "antd";
import Carousel from "react-multi-carousel";
import Image from "next/image";

import ImageSlider from "./ImageSlider";

import styles from "./Images.module.scss";

const Images: React.FC<{
  image: string;
  images: Array<string>;
}> = ({ image, images }) => {
  const [imageShow, setImageShow] = useState<string>(image);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={styles["images"]}>
      <div className={styles["images_slider"]}>
        <Image
          className={styles["images_slider_item"]}
          src={imageShow}
          alt="product-image"
          width={700}
          height={700}
          onClick={() => setVisible(true)}
          priority
        />
        <ImageAntd
          style={{ display: "none" }}
          preview={{
            visible,
            src: imageShow,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
          alt="preview"
        />
      </div>
      <div className={styles["images_controller"]}>
        <Carousel
          className={styles["images_controller-images"]}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 10 },
              items: 6,
            },
          }}
        >
          {images &&
            images.map((i, index) => (
              <ImageSlider
                key={index}
                src={i}
                onMouseEnter={() => setImageShow(i)}
              />
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default memo(Images);
