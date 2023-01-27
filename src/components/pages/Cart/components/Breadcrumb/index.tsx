import React from "react";
import Image from "next/image";

import breadcrumb from "~/assets/breadcrumb/breadcrumb.webp";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb = () => {
  return (
    <div className={styles["breadcrumb"]}>
      <Image
        className={styles["breadcrumb_image"]}
        src={breadcrumb}
        alt="breadcrumb"
      />
      <div className={styles["breadcrumb_overlay"]}></div>
    </div>
  );
};

export default Breadcrumb;
