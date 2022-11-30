import React from "react";

import ImageLink from "~/components/atomics/ImageLink";

import styles from "./Banner.module.scss";

const Banner = () => (
  <div className={styles["banner-wrapper"]}>
    <div className={styles["banner-top"]}>
      <ImageLink
        href="/banner.png"
        src="/banner.png"
        width={395}
        height={115}
        alt="banner"
      />
    </div>
    <div className={styles["banner-bottom"]}>
      <ImageLink
        href="/banner.png"
        src="/banner.png"
        width={395}
        height={115}
        alt="banner"
      />
    </div>
  </div>
);

export default Banner;
