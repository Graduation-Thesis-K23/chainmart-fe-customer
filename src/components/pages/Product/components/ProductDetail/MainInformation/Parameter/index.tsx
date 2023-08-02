import React, { memo } from "react";

import { convertPrice, discount } from "~/helpers";
import styles from "./Parameter.module.scss";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { Skeleton } from "antd";

const Parameter: React.FC<{
  name: string;
  star: number;
  sold: number;
  price: number;
  sale?: number;
}> = ({ name, price, sale = 0 }) => {
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
          <h1 className={styles["title"]}>
            {name}
            <div className={styles["value"]}>
              <span className={styles["value-price"]}>
                {convertPrice(price)}
              </span>

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
          </h1>
        </>
      )}
    </>
  );
};

export default memo(Parameter);
