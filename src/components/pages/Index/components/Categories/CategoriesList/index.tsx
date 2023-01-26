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
        <Link
          key={key}
          href={href}
          prefetch={false}
          className={styles["categories-list-item"]}
        >
          <div className={styles["categories-list-item-image"]}>
            <Image src={src} alt="category" fill />
          </div>
          <div className={styles["categories-list-item-title"]}>
            {translate(titleKey)}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
