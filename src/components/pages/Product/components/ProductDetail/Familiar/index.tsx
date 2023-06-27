import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import useTranslate from "~/hooks/useLocales";
import styles from "./Familiar.module.scss";
import { convertPrice, discount } from "~/helpers";
import { useAppDispatch, useAppSelector, fetchFamiliarProduct } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const Familiar = () => {
  const familiarText = useTranslate("product.familiar");

  const product = useAppSelector((state) => state.product);
  const { data } = useAppSelector((state) => state.familiar);

  const dispatch = useAppDispatch();

  const items = data.slice(0, 5);

  useEffect(() => {
    dispatch(fetchFamiliarProduct(product.data.id));
  }, [dispatch, product.data.id]);

  return (
    <div className={styles["familiar"]}>
      <div className={styles["familiar_title"]}>{familiarText}</div>
      <ul className={styles["familiar_list"]}>
        {items.map((item) => (
          <li key={item.id} className={styles["familiar_item"]}>
            <Link href={item.slug} className={styles["familiar_item_link"]}>
              <div className={styles["familiar_item_image"]}>
                <Image
                  src={getS3Image(item.images[0])}
                  fill
                  alt={item.slug}
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 45vw,
                    50vw"
                />
              </div>
              <div className={styles["familiar_item_body"]}>
                <span className={styles["familiar_item_body_name"]}>
                  {item.name}
                </span>
                <div className={styles["familiar_item_body_prices"]}>
                  <span className={styles["familiar_item_body_prices_one"]}>
                    {convertPrice(item.price)}
                  </span>
                  <span className={styles["familiar_item_body_prices_two"]}>
                    {convertPrice(
                      discount(item.price, item.sale ? item.sale : 0)
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Familiar;
