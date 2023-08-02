import React, { memo } from "react";
import classNames from "classnames";

import styles from "./Quantity.module.scss";
import { INCREASE, DECREASE } from "~/constants";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { Skeleton } from "antd";

const Quantity: React.FC<{
  maxQuantity: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}> = ({ maxQuantity, quantity, setQuantity }) => {
  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;
  /* {
     isLoading ? <></> : <></>;
   } */

  const handleChangeQuantity = (action: string) => {
    if (action === INCREASE && quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else if (action === DECREASE && quantity !== 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  /*   */

  return (
    <div className={styles["quantity"]}>
      {isLoading ? (
        <>
          <div
            style={{
              width: 200,
            }}
          >
            <Skeleton.Input active block size="large" />
          </div>
        </>
      ) : (
        <>
          <div className={styles["quantity-title"]}>
            <span>Số lượng</span>
          </div>
          <div className={styles["quantity-control"]}>
            <button
              className={classNames(styles["quantity-control-sub"], {
                [styles["quantity-control-sub--disable"]]: quantity === 1,
              })}
              onClick={() => handleChangeQuantity(DECREASE)}
            >
              -
            </button>
            <span className={styles["quantity-control-value"]}>{quantity}</span>
            <button
              className={classNames(styles["quantity-control-add"], {
                [styles["quantity-control-add--disable"]]:
                  quantity === maxQuantity,
              })}
              onClick={() => handleChangeQuantity(INCREASE)}
            >
              +
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Quantity);
