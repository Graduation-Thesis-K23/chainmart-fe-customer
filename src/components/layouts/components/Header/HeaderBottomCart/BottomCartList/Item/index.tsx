// libs
import React from "react";
import Image from "next/image";
import Link from "next/link";
// others
import convertPrice from "~/helpers/convert-price";
import styles from "./BottomCartItem.module.scss";

interface Props {
  href: string;
  image: string;
  name: string;
  price: number;
}

const BottomCartItem = ({ href, image, name, price }: Props) => (
  <div className={styles["cart-item-wrapper"]}>
    <Link href={`/${href}`} prefetch={false}>
      <a>
        <div className={styles["cart-item-image"]}>
          <Image
            src={image}
            width={40}
            height={40}
            objectFit={"cover"}
            layout={"fixed"}
            alt="item"
          />
        </div>
        <div className={styles["cart-item-name"]}>
          <span>{name}</span>
        </div>
        <div className={styles["cart-item-price"]}>
          <span>{convertPrice(price)}đ</span>
        </div>
      </a>
    </Link>
  </div>
);

export default BottomCartItem;
