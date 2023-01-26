import React from "react";
import Link from "next/link";
import Image from "next/image";

import useTranslate from "~/hooks/useTranslate";
import styles from "./Familiar.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";
import { convertPrice } from "~/helpers";

const Familiar = () => {
  const familiarText = useTranslate("product.familiar");
  const { image, familiar } = useProductDetail().productDetail;

  return (
    <>
      {image && (
        <div className={styles["familiar"]}>
          <div className={styles["familiar_title"]}>{familiarText}</div>
          <ul className={styles["familiar_list"]}>
            {familiar.map((item) => (
              <li key={item.id} className={styles["familiar_item"]}>
                <Link href={item.slug} className={styles["familiar_item_link"]}>
                  <div className={styles["familiar_item_image"]}>
                    <Image src={item.image} fill alt={item.slug} />
                  </div>
                  <div className={styles["familiar_item_body"]}>
                    <span className={styles["familiar_item_body_name"]}>
                      {item.name}
                    </span>
                    <div className={styles["familiar_item_body_prices"]}>
                      <span className={styles["familiar_item_body_prices_one"]}>
                        {convertPrice(item.price)}đ
                      </span>
                      <span className={styles["familiar_item_body_prices_two"]}>
                        {convertPrice(item.ignorePrice)}đ
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Familiar;
