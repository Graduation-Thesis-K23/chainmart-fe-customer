import React, { useRef, useState } from "react";
import { Carousel, Button } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";
import Image from "next/image";
import classNames from "classnames";

import carouselList from "~/apis/mocks/CarouselList";
import styles from "./Carousel.module.scss";

const CarouselComponent = () => {
  const [controller, setController] = useState(false);
  const carousel = useRef<CarouselRef>(null);

  const onPrev = () => {
    carousel.current?.prev();
  };

  const onNext = () => {
    carousel.current?.next();
  };

  return (
    <div
      className={styles["carousel"]}
      onMouseEnter={() => setController(true)}
      onMouseLeave={() => setController(false)}
    >
      <Carousel ref={carousel} autoplay>
        {carouselList.map(({ id, src }) => (
          <div key={id}>
            <Image
              className={styles["carousel_image"]}
              src={src}
              width={1200}
              height={423}
              alt={`carousel-${id}`}
              priority
              placeholder="blur"
            />
          </div>
        ))}
      </Carousel>
      <div
        className={classNames(styles["carousel_controller"], {
          [styles["show"]]: controller,
        })}
      >
        <Button
          className={styles["carousel-prev-btn"]}
          shape="circle"
          size="large"
          icon={
            <CaretLeftOutlined
              style={{
                marginRight: "4px",
                marginTop: "4px",
              }}
            />
          }
          onClick={onPrev}
        />
        <Button
          className={styles["carousel-next-btn"]}
          shape="circle"
          size="large"
          icon={
            <CaretRightOutlined
              style={{
                marginLeft: "4px",
                marginTop: "4px",
              }}
            />
          }
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default CarouselComponent;
