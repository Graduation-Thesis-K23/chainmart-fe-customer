import React from "react";
import Link from "next/link";

import AdsImagesList from "~/dataSources/AdsImages";
import styles from "./AdsImage.module.scss";
import Image from "next/image";

const AdsImages = () => (
  <div className={styles["ads-images"]}>
    <div className={styles["ads-images-inner"]}>
      <ul className={styles["ads-images-list"]}>
        {AdsImagesList.map(({ key, src, href }) => (
          <li key={key} className={styles["ads-images-list-item"]}>
            <Link href={href}>
              <a>
                <Image src={src} alt="ads-image" width={388} height={97} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AdsImages;
