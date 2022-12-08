import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";

import ImageSlider from "./ImageSlider";

import styles from "./MainInformation.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";

const MainInformation = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const { productDetail } = useProductDetail();

  return (
    <>
      {productDetail.image && (
        <div className={styles["main-information"]}>
          <div className={styles["main-information-left"]}>
            <div className={styles["main-information-left-image"]}>
              <Image
                src={productDetail.image}
                alt={productDetail.name}
                width={450}
                height={450}
              />
            </div>
            <div className={styles["main-information-left-controller"]}>
              <Carousel
                className={styles["main-information-left-controller-images"]}
                ref={carouselRef}
                dots={false}
                infinite={false}
              >
                <div
                  className={
                    styles["main-information-left-controller-images-item"]
                  }
                >
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                </div>
                <div
                  className={
                    styles["main-information-left-controller-images-item"]
                  }
                >
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                </div>
                <div
                  className={
                    styles["main-information-left-controller-images-item"]
                  }
                >
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                  <ImageSlider src="/product.jpg" />
                </div>
              </Carousel>
              <div
                className={styles["main-information-left-controller-prev"]}
                onClick={() => carouselRef.current?.prev()}
              >
                <LeftCircleOutlined />
              </div>
              <div
                className={styles["main-information-left-controller-next"]}
                onClick={() => carouselRef.current?.next()}
              >
                <RightCircleOutlined />
              </div>
            </div>
          </div>
          <div className={styles["main-information-right"]}>RIGHT</div>
        </div>
      )}
    </>
  );
};

export default MainInformation;
