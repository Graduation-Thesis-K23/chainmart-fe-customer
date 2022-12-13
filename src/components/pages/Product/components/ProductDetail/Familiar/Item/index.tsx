import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";

import { FamiliarProduct } from "~/shared/interfaces";
import { convertPrice } from "~/helpers";
import styles from "./Item.module.scss";

const Item: React.FC<{
  item: FamiliarProduct;
}> = ({ item }) => {
  return (
    <Link href={item.slug}>
      <a className={styles["item"]}>
        <div className={styles["item-image"]}>
          <Image src={item.image} width={230} height={230} alt={item.slug} />
        </div>
        <div className={styles["item-body"]}>
          <span className={styles["item-body-name"]}>{item.name}</span>
          <div className={styles["item-body-prices"]}>
            <span className={styles["item-body-prices-one"]}>
              {convertPrice(item.price)}đ
            </span>
            <span className={styles["item-body-prices-two"]}>
              {convertPrice(item.ignorePrice)}đ
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Item;
