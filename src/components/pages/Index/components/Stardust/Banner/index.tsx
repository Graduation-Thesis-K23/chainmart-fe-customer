import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Banner.module.scss";

const Banner = () => (
  <div className={styles["banner-wrapper"]}>
    <div className={styles["banner-top"]}>
      <Link href="/banner.png" as="/banner.png" prefetch={false}>
        <a
          style={{
            display: "inline-block",
            width: `${395}px`,
            height: `${115}px`,
          }}
        >
          <Image src="/banner.png" width={395} height={115} alt="banner" />
        </a>
      </Link>
    </div>
    <div className={styles["banner-bottom"]}>
      <Link href="/banner.png" as="/banner.png" prefetch={false}>
        <a
          style={{
            display: "inline-block",
            width: `${395}px`,
            height: `${115}px`,
          }}
        >
          <Image src="/banner.png" width={395} height={115} alt="banner" />
        </a>
      </Link>
    </div>
  </div>
);

export default Banner;
