import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./CategoriesList.module.scss";
import categoriesList from "~/dataSources/CategoriesList";
import { default as translate } from "~/hooks/useTranslate";

const CategoriesList = () => {
  return (
    <div className={styles["categories-list"]}>
      {categoriesList.map(({ key, href, src, titleKey }) => (
        <Link key={key} href={href}>
          <a className={styles["categories-list-item"]}>
            <div className={styles["categories-list-item-image"]}>
              <Image
                src={src}
                width={84}
                height={84}
                objectFit="contain"
                alt="category"
              />
            </div>
            <div className={styles["categories-list-item-title"]}>
              {translate(titleKey)}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
