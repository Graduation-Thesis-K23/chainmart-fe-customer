import React, { useRef, useState, Fragment } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import Image from "next/image";

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
          <Fragment key={id}>
            <Image src={src} width="800" height="235" alt="carousel" />
          </Fragment>
        ))}
      </Carousel>
      {controller && (
        <>
          <div className={styles["carousel-prev-btn"]} onClick={onPrev}></div>
          <div className={styles["carousel-next-btn"]} onClick={onNext}></div>
        </>
      )}
    </div>
  );
};

export default CarouselComponent;
