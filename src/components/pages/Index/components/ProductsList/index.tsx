import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";

import productsList from "~/apis/mocks/ProductsList";
import styles from "./ProductsList.module.scss";
import { convertPrice, discount } from "~/helpers";
import useTranslate from "~/hooks/useTranslate";

const ProductsList = () => {
  const soldText = useTranslate("products.sold");

  return (
    <ul className={styles["products-list"]}>
      {productsList.map((item) => (
        <li key={item.id} className={styles["products-list-item"]}>
          <Link
            href={"/[slug]"}
            as={"/" + item.slug}
            className={styles["product-card"]}
          >
            {item.label && (
              <div className={styles["product-card-label"]}>
                <span className={styles["product-card-label-text"]}>
                  {item.label}
                </span>
              </div>
            )}
            {discount(item.price, item.ignorePrice) > 0 && (
              <div className={styles["product-card-discount"]}>
                <span className={styles["product-card-discount-percent"]}>
                  {discount(item.price, item.ignorePrice)}%
                </span>
                <span className={styles["product-card-discount-text"]}>
                  off
                </span>
              </div>
            )}
            <div className={styles["product-card-image"]}>
              <Image
                src={item.image}
                width={230}
                height={230}
                alt={item.slug}
                priority
              />
            </div>
            <div className={styles["product-card-body"]}>
              <span className={styles["product-card-body-name"]}>
                {item.name}
              </span>
              <div className={styles["product-card-body-prices"]}>
                <span className={styles["product-card-body-prices-one"]}>
                  {convertPrice(item.price)}đ
                </span>
                {discount(item.price, item.ignorePrice) > 0 && (
                  <span className={styles["product-card-body-prices-two"]}>
                    {convertPrice(item.ignorePrice)}đ
                  </span>
                )}
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
              {item.sold > 0 && (
                <div className={styles["product-card-footer-sold"]}>
                  <span>
                    {item.sold} {soldText}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(ProductsList);
