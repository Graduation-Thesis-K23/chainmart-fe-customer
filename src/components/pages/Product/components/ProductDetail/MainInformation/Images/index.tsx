import React, { useState, memo, useEffect } from "react";
import { Image as ImageAntd } from "antd";
import Carousel from "react-multi-carousel";
import Image from "next/image";

import ImageSlider from "./ImageSlider";

import styles from "./Images.module.scss";
import getS3Image from "~/helpers/get-s3-image";

const Images: React.FC<{
  images: Array<string>;
}> = ({ images }) => {
  const [imageShow, setImageShow] = useState<string>(images[0]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setImageShow(images[0]);
  }, [images]);

  return (
    <div className={styles["images"]}>
      <div className={styles["images_slider"]}>
        <Image
          className={styles["images_slider_item"]}
          src={getS3Image(imageShow)}
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
            src: getS3Image(imageShow),
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
          {images.map((i, index) => (
            <ImageSlider
              key={index}
              src={getS3Image(i)}
              onMouseEnter={() => setImageShow(getS3Image(i))}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default memo(Images);
