import React, { FC, memo } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./HeaderSearchItem.module.scss";
import Translate from "~/components/commons/Translate";

const HeaderSearchItem: FC<{
  href: string;
  image?: string | undefined;
  name: string;
}> = ({ href, image, name }) => {
  return (
    <Link className={styles["search__item"]} href={href}>
      {image ? (
        <>
          <Image
            className={styles["search__image"]}
            src={image}
            alt="product-image"
            width="40"
            height="40"
          />
          <span className={styles["search__name"]}>{name}</span>
        </>
      ) : (
        <span className={styles["search__name"]}>
          <Translate textKey={name} />
        </span>
      )}
    </Link>
  );
};

export default memo(HeaderSearchItem);
