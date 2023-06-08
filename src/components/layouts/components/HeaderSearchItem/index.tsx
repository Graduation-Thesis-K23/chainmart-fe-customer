import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./HeaderSearchItem.module.scss";

const HeaderSearchItem: FC<{
  href: string;
  image: string;
  name: string;
}> = ({ href, image, name }) => (
  <Link href={href} prefetch={false} className={styles["search-item"]}>
    <Image src={image} alt="product-image" width="40" height="40" />
    <span>{name}</span>
  </Link>
);

export default HeaderSearchItem;
