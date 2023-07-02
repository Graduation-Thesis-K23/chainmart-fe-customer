import React, { FC, Fragment, memo, useMemo } from "react";
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
import {
  CloseOutlined,
  FrownOutlined,
  ImportOutlined,
  PartitionOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import useTranslate from "~/hooks/useLocales";

enum StepStatus {
  Wait = "wait",
  Process = "process",
  Finish = "finish",
  Error = "error",
}

const calculateCurrentStep = (
  approve_at: Date | undefined,
  shipped_date: Date | undefined,
  cancelled_date: Date | undefined,
  return_date: Date | undefined
) => {
  if (return_date) {
    return 4;
  }

  if (cancelled_date) {
    return 0;
  }

  if (shipped_date) {
    return 3;
  }

  if (approve_at) {
    return 2;
  }

  return 1;
};

const Order: FC<OrderType> = ({
  id,
  create_at,
  address,
  shipped_date,
  approved_date,
  return_date,
  cancelled_date,
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

  const createAtText = useTranslate("purchase.stepsCreateAt");
  const approvedText = useTranslate("purchase.stepsApprovedAt");
  const shippingText = useTranslate("purchase.stepsShippingAt");
  const completedText = useTranslate("purchase.stepsCompletedAt");
  const returnText = useTranslate("purchase.stepsReturnedAt");
  const cancelText = useTranslate("purchase.stepsCancelledAt");

  const stepsItem = useMemo(() => {
    const currentStep = calculateCurrentStep(
      approved_date,
      shipped_date,
      cancelled_date,
      return_date
    );

    /* 
      0. Cancelled
      1. Created
      2. Approved
      3. Shipping
      4. Completed
      5. Returned
    */

    const items = [
      {
        title: createAtText,
        status: StepStatus.Finish,
        icon: (
          <ShoppingCartOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: create_at.toLocaleString("vi-VN"),
      },
      {
        title: approvedText,
        status: currentStep > 1 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <SolutionOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: approved_date
          ? approved_date.toLocaleString("vi-VN")
          : null,
      },
      {
        title: shippingText,
        status: currentStep > 1 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <PartitionOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: approved_date
          ? approved_date.toLocaleString("vi-VN")
          : null,
      },
      {
        title: completedText,
        status: currentStep > 2 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <ImportOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: shipped_date ? shipped_date.toLocaleString("vi-VN") : null,
      },
    ];

    if (cancelled_date) {
      items.push({
        title: cancelText,
        status: StepStatus.Error,
        icon: (
          <CloseOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: cancelled_date
          ? cancelled_date.toLocaleString("vi-VN")
          : null,
      });
    }

    if (return_date) {
      items.push({
        title: returnText,
        status: StepStatus.Error,
        icon: (
          <FrownOutlined
            style={{
              fontSize: 36,
            }}
          />
        ),
        description: return_date.toLocaleString("vi-VN"),
      });
    }

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles["order__steps"]}>
        <Steps items={stepsItem} labelPlacement="vertical" />
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
