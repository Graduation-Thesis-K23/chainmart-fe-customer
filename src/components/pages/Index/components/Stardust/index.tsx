import React, { memo } from "react";

import Carousel from "./Carousel";

import styles from "./Stardust.module.scss";

const Stardust = () => (
  <section className={styles["stardust"]}>
    <div className="container">
      <Carousel />
    </div>
  </section>
);

export default memo(Stardust);
