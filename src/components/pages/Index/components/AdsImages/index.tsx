import React from "react";
import Link from "next/link";

import styles from "./AdsImage.module.scss";
import Image from "next/image";

const AdsImages: React.FC<{
  data: Array<{
    key: number;
    src: string;
    href: string;
  }>;
}> = ({ data }) => (
  <div className={styles["ads-images"]}>
    <div className={styles["ads-images-inner"]}>
      <ul className={styles["ads-images-list"]}>
        {data.map(({ key, src, href }) => (
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
