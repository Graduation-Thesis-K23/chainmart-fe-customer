import React, { FC, Fragment, memo } from "react";
import Image from "next/image";

import styles from "./Order.module.scss";
import {
  OrderType,
  cancelOrder,
  receivedOrder,
  resellOrder,
  returnOrder,
  useAppDispatch,
} from "~/redux";
import Translate from "~/components/commons/Translate";
import getS3Image from "~/helpers/get-s3-image";
import { convertPrice, discount } from "~/helpers";
import { OrderStatus } from "~/shared";

const Order: FC<OrderType> = ({
  id,
  create_at,
  address,
  estimated_shipped_date,
  shipped_date,
  approved_date,
  return_date,
  status,
  payment,
  products,
}) => {
  const dispatch = useAppDispatch();

  const handleCancelOrder = () => {
    dispatch(cancelOrder(id));
  };

  const handleReceivedOrder = () => {
    dispatch(receivedOrder(id));
  };

  const handleComment = () => {
    console.log("comment");
  };

  const handleReturnOrder = () => {
    dispatch(returnOrder(id));
  };

  const handleResell = () => {
    dispatch(resellOrder(id));
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case OrderStatus.Approved:
        return (
          <div className={styles["order__footer__prepare"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleCancelOrder}
            >
              <Translate textKey="purchase.cancelBtn" />
            </button>
          </div>
        );
      case OrderStatus.Shipping:
        return (
          <div className={styles["order__footer__shipping"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleReceivedOrder}
            >
              <Translate textKey="purchase.shippingBtn" />
            </button>
          </div>
        );
      case OrderStatus.Completed:
        return (
          <div className={styles["order__footer__delivered"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleComment}
            >
              <Translate textKey="purchase.deliveredBtn" />
            </button>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleReturnOrder}
            >
              <Translate textKey="purchase.returnedBtn" />
            </button>
          </div>
        );
      case OrderStatus.Cancelled:
        return (
          <div className={styles["order__footer__cancelled"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleResell}
            >
              <Translate textKey="purchase.cancelledBtn" />
            </button>
          </div>
        );
      case OrderStatus.Returned:
        return null;
      default:
        return (
          <div className={styles["order__footer__waiting"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleCancelOrder}
            >
              <Translate textKey="purchase.cancelBtn" />
            </button>
          </div>
        );
    }
  };

  return (
    <li className={styles["order"]} id={id}>
      <div className={styles["order__header"]}>
        <div className={styles["order__header__createAt"]}>
          <Translate textKey="purchase.createAt" />:{" "}
          {create_at.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <div className={styles["order__header__id"]}>
          <Translate textKey="purchase.orderId" />:{" "}
          <span className={styles["order__header__id__text"]}>
            {id + " | "}
          </span>
          <span
            className={styles["order__header__id__text"]}
            style={{
              textTransform: "uppercase",
            }}
          >
            <Translate textKey={status} />
          </span>
        </div>
      </div>
      <ul className={styles["order__list"]}>
        {products.map((product) => (
          <Fragment key={product.id}>
            <li className={styles["order__list__item"]}>
              <div className={styles["order__list__item__image"]}>
                <Image
                  src={getS3Image(product.image)}
                  alt={product.name}
                  width={90}
                  height={90}
                />
              </div>
              <div className={styles["order__list__item__nq"]}>
                <p className={styles["order__list__item__nq__name"]}>
                  {product.name}
                </p>
                <p className={styles["order__list__item__nq__quantity"]}>
                  x{product.quantity}
                </p>
              </div>
              <div className={styles["order__list__item__price"]}>
                {product.sale > 0 && (
                  <>
                    <span className={styles["order__list__item__price__2"]}>
                      {convertPrice(discount(product.price, product.sale))}
                    </span>
                  </>
                )}{" "}
                <span className={styles["order__list__item__price__1"]}>
                  {convertPrice(product.price)}
                </span>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
      <div className={styles["order__footer"]}>{renderStatus(status)}</div>
    </li>
  );
};

export default memo(Order);
