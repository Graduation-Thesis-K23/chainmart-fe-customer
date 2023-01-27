import React from "react";
import Link from "next/link";

import styles from "./AdsImage.module.scss";
import Image from "next/image";
import adsImages from "~/dataSources/AdsImages";

const AdsImages = () => (
  <div className={styles["ads-images"]}>
    <div className={styles["ads-images-inner"]}>
      <ul className={styles["ads-images-list"]}>
        {adsImages.map(({ key, src, href }) => (
          <li key={key} className={styles["ads-images-list-item"]}>
            <Link href={href} prefetch={false}>
              <Image src={src} alt="ads-image" width={388} height={97} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AdsImages;
