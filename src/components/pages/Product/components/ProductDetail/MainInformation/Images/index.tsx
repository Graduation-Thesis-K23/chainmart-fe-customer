import React, { useState, memo, useEffect } from "react";
import { Image as ImageAntd, Skeleton } from "antd";
import Carousel from "react-multi-carousel";
import Image from "next/image";

import ImageSlider from "./ImageSlider";

import styles from "./Images.module.scss";
import getS3Image from "~/helpers/get-s3-image";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

const Images: React.FC<{
  images: Array<string>;
}> = ({ images = [] }) => {
  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;
  /* {
     isLoading ? <></> : <></>;
   } */

  const [imageShow, setImageShow] = useState<string>(images[0]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setImageShow(images[0]);
  }, [images]);

  return (
    <div className={styles["images"]}>
      <div className={styles["images_slider"]}>
        {isLoading ? (
          <div>
            <div
              style={{
                width: 476,
                height: 476,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <Skeleton.Input
                active
                block
                style={{
                  height: 476,
                }}
              />
            </div>
          </div>
        ) : (
          <Image
            className={styles["images_slider_item"]}
            src={getS3Image(imageShow)}
            alt="product-image"
            width={700}
            height={700}
            onClick={() => setVisible(true)}
            priority
          />
        )}
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
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: 80,
              width: "100%",
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  height: 80,
                  width: 80,
                  overflow: "hidden",
                }}
              >
                <Skeleton.Input
                  active
                  block
                  style={{
                    height: 80,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            className={styles["images_controller-images"]}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 10 },
                items: 5,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 4,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 4,
              },
            }}
          >
            {images.map((i, index) => (
              <ImageSlider
                key={index}
                src={getS3Image(i)}
                onMouseEnter={() => setImageShow(i)}
              />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default memo(Images);
