// libs
import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";
// others
import styles from "./ProductCard.module.scss";
import { default as translate } from "~/hooks/useTranslate";
import { convertPrice } from "~/helpers";

const ProductCard: React.FC<{
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  star: number;
  sold: number;
  image: string;
  slug: string;
}> = (item) => {
  return (
    <Link href={"/" + item.slug}>
      <a className={styles["product-card"]}>
        <div className={styles["product-card-image"]}>
          <Image src={item.image} width={230} height={230} alt={item.slug} />
        </div>
        <div className={styles["product-card-body"]}>
          <span className={styles["product-card-body-name"]}>{item.name}</span>
          <div className={styles["product-card-body-prices"]}>
            <span className={styles["product-card-body-prices-one"]}>
              {convertPrice(item.price)}đ
            </span>
            <span className={styles["product-card-body-prices-two"]}>
              {convertPrice(item.ignorePrice)}đ
            </span>
          </div>
        </div>
        <div className={styles["product-card-footer"]}>
          <div className={styles["product-card-footer-star"]}>
            <Rate
              className={styles["product-card-footer-star-item"]}
              disabled
              allowHalf
              value={item.star}
            />
          </div>
          <div className={styles["product-card-footer-sold"]}>
            <span>
              {item.sold} {translate("products.sold")}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default memo(ProductCard);
