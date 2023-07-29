import React, { memo } from "react";

import { convertPrice, discount } from "~/helpers";
import styles from "./Parameter.module.scss";

const Parameter: React.FC<{
  name: string;
  star: number;
  sold: number;
  price: number;
  sale?: number;
}> = ({ name, price, sale = 0 }) => {
  return (
    <>
      <h1 className={styles["title"]}>{name}</h1>

      <div className={styles["value"]}>
        <span className={styles["value-price"]}>{convertPrice(price)}</span>

        {sale > 0 && (
          <>
            <span className={styles["value-price-ignore"]}>
              {convertPrice(discount(price, sale))}
            </span>
            <span className={styles["value-discount"]}>{sale}%</span>
          </>
        )}
      </div>
    </>
  );
};

export default memo(Parameter);
