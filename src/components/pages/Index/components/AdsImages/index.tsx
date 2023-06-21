import React from "react";

import styles from "./AdsImage.module.scss";
import Image from "next/image";
import adsList from "~/sub-categories/ads";

const AdsImages = () => (
  <div className={styles["ads-images"]}>
    <div className={styles["ads-images-inner"]}>
      <ul className={styles["ads-images-list"]}>
        {adsList.map(({ id, src }) => (
          <li key={id} className={styles["ads-images-list-item"]}>
            <Image src={src} alt="ads-image" width={388} height={97} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AdsImages;
