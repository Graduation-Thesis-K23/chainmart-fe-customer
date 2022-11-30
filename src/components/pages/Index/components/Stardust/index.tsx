// libs
import React from "react";
// components
import Carousel from "./Carousel";
import Banner from "./Banner";
import HotWords from "./HotWords";
// others
import styles from "./Stardust.module.scss";

const Stardust = () => (
  <div className={styles["stardust-wrapper"]}>
    <div className={styles["stardust-wrapper-inner"]}>
      <div className={styles["stardust-top"]}>
        <Carousel />
        <Banner />
      </div>
      <HotWords />
    </div>
  </div>
);

export default Stardust;
