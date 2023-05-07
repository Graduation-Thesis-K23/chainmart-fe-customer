import React, { memo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";

import styles from "./ProductsList.module.scss";
import { convertPrice, discount } from "~/helpers";
import useTranslate from "~/hooks/useLocales";
import { useAppDispatch, useAppSelector } from "~/redux";
import { fetchProducts } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";
import checkCreated from "~/helpers/check-created";

const ProductsList = () => {
  const soldText = useTranslate("products.sold");

  const { data } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ul className={styles["products-list"]}>
      {data.map((item) => (
        <li key={item.id} className={styles["products-list-item"]}>
          <Link
            href={"/[slug]"}
            as={"/" + item.slug}
            className={styles["product-card"]}
          >
            {checkCreated(item.created_at) && (
              <div className={styles["product-card-label"]}>
                <span className={styles["product-card-label-text"]}>New</span>
              </div>
            )}
            {item.sale && (
              <div className={styles["product-card-discount"]}>
                <span className={styles["product-card-discount-percent"]}>
                  {item.sale}%
                </span>
                <span className={styles["product-card-discount-text"]}>
                  off
                </span>
              </div>
            )}
            <div className={styles["product-card-image"]}>
              <Image
                src={getS3Image(item.images[0])}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 45vw, 50vw"
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
                {item.sale && (
                  <span className={styles["product-card-body-prices-two"]}>
                    {convertPrice(discount(item.price, item.sale))}đ
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
                  value={3}
                />
              </div>
              {item.quantity !== item.units_in_stocks && (
                <div className={styles["product-card-footer-sold"]}>
                  <span>
                    {item.quantity -
                      item.units_in_stocks -
                      item.units_on_orders +
                      " "}
                    {soldText}
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
