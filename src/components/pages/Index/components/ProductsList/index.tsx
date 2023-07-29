import React, { memo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";

import styles from "./ProductsList.module.scss";
import { convertPrice, discount } from "~/helpers";
import { useAppDispatch, useAppSelector } from "~/redux";
import { fetchProducts } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const ProductsList = () => {
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
            <div className={styles["product-card"]}>
              {true && (
                <div className={styles["product-card-label"]}>
                  <span className={styles["product-card-label-text"]}>New</span>
                </div>
              )}
              {item.sale ? (
                <div className={styles["product-card-discount"]}>
                  <span className={styles["product-card-discount-percent"]}>
                    {item.sale}%
                  </span>
                  <span className={styles["product-card-discount-text"]}>
                    off
                  </span>
                </div>
              ) : (
                <></>
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
                  <span
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <span className={styles["product-card-body-prices-one"]}>
                      {convertPrice(item.price)}
                    </span>
                    {item.sale ? (
                      <span className={styles["product-card-body-prices-two"]}>
                        {convertPrice(discount(item.price, item.sale))}
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  {item.star > 0 ? (
                    <div
                      className={styles["product-card-footer-star"]}
                      style={{
                        display: "inline-block",
                        minWidth: 100,
                      }}
                    >
                      <Rate
                        className={styles["product-card-footer-star-item"]}
                        disabled
                        allowHalf
                        value={item.star}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(ProductsList);
