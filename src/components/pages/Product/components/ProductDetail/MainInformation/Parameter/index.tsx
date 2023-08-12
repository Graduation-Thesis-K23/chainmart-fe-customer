import React, { memo } from "react";

import { convertPrice, discount } from "~/helpers";
import styles from "./Parameter.module.scss";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { Rate, Skeleton } from "antd";
import Translate from "~/components/commons/Translate";

const Parameter: React.FC<{
  name: string;
  sold: number;
  price: number;
  sale?: number;
}> = ({ name, price, sale = 0, sold = 0 }) => {
  const { averageStar } = useAppSelector((state) => state.rating.data);

  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;
  /* {
     isLoading ? <></> : <></>;
   } */

  return (
    <>
      {isLoading ? (
        <div>
          <div
            style={{
              width: 300,
            }}
          >
            <Skeleton.Input active block />
          </div>
          <div
            style={{
              width: 150,
              marginTop: 20,
            }}
          >
            <Skeleton.Input active block />
          </div>
        </div>
      ) : (
        <>
          <h1 className={styles["title"]}>{name}</h1>
          <div className={styles["parameter"]}>
            <Rate
              className={styles["parameter-star"]}
              allowHalf
              disabled
              value={averageStar}
            />
            <span className={styles["parameter-sold"]}>
              {sold + " "} <Translate textKey="products.sold" />
            </span>
          </div>
          <div className={styles["value"]}>
            <span className={styles["value-price"]}>{convertPrice(price)}</span>

            {sale > 0 ? (
              <>
                <span className={styles["value-price-ignore"]}>
                  {convertPrice(discount(price, sale))}
                </span>
                <span className={styles["value-discount"]}>{sale}%</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default memo(Parameter);
