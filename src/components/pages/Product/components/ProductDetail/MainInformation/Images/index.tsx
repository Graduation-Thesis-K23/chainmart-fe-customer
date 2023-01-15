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
    <div className={styles["left"]}>
      <div className={styles["left-images"]}>
        <Image
          src={imageShow}
          alt="product-image"
          width={450}
          height={450}
          objectFit="contain"
          onClick={() => setVisible(true)}
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
      <div className={styles["left-controller"]}>
        <Carousel
          className={styles["left-controller-images"]}
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
