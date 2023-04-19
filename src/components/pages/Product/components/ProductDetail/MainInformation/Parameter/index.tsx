import React, { memo } from "react";
import { Rate } from "antd";

import { convertPrice, discount } from "~/helpers";
import styles from "./Parameter.module.scss";
import useTranslate from "~/hooks/useLocales";

const Parameter: React.FC<{
  name: string;
  star: number;
  sold: number;
  price: number;
  sale?: number;
}> = ({ name, star, sold, price, sale = 0 }) => {
  const soldText = useTranslate("products.sold");

  return (
    <>
      <h1 className={styles["title"]}>{name}</h1>
      <div className={styles["parameter"]}>
        <Rate
          className={styles["parameter-star"]}
          allowHalf
          disabled
          value={star}
        />
        <span className={styles["parameter-sold"]}>
          {sold + " " + soldText}
        </span>
      </div>
      <div className={styles["value"]}>
        <span className={styles["value-price"]}>{convertPrice(price)} đ</span>
        <span className={styles["value-price-ignore"]}>
          {convertPrice(discount(price, sale))} đ
        </span>
        {sale > 0 && <span className={styles["value-discount"]}>{sale}%</span>}
      </div>
    </>
  );
};

export default memo(Parameter);
