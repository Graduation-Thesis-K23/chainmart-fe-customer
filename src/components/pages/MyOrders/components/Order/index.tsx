import React, { FC, Fragment, memo, useMemo, useState } from "react";
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
import { Col, Modal, Row, Steps } from "antd";
import useTranslate from "~/hooks/useLocales";
import OrderComment from "../OrderComment";

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
  const [openComment, setOpenComment] = useState(false);

  const dispatch = useAppDispatch();

  const handleCancelOrder = () => {
    dispatch(cancelOrder(id));
  };

  const handleReceivedOrder = () => {
    dispatch(receivedOrder(id));
  };

  const handleComment = () => {
    setOpenComment(true);
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
  const commentTitleText = useTranslate("purchase.commentTitle");

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

  const productsPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [products]);

  const shippingPrice = useMemo(() => {
    return productsPrice > 3000000 ? 0 : 30000;
  }, [productsPrice]);

  const totalPrice = useMemo(() => {
    return productsPrice + shippingPrice;
  }, [productsPrice, shippingPrice]);

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

  const handleCancelComment = () => {
    setOpenComment(false);
  };

  return (
    <>
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
        <div className={styles["order__info"]}>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className={styles["order__info__address"]}>
                <p className={styles["order__info__address__title"]}>
                  <Translate textKey="purchase.address" />
                </p>
                <p className={styles["order__info__address__name"]}>
                  {address.name}
                </p>
                <span className={styles["order__info__address__text"]}>
                  {address.phone}
                </span>
                <br />
                <span className={styles["order__info__address__text"]}>
                  {`${address.street}, ${address.ward}, ${address.city}, ${address.district}`}
                </span>
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <div className={styles["order__info__price"]}>
                <div className={styles["order__info__price__table"]}>
                  <div className={styles["order__info__price__left"]}>
                    <Translate textKey="purchase.productsPrice" />
                  </div>
                  <div className={styles["order__info__price__right"]}>
                    {convertPrice(productsPrice)}
                  </div>
                </div>
                <div className={styles["order__info__price__table"]}>
                  <div className={styles["order__info__price__left"]}>
                    <Translate textKey="purchase.shippingPrice" />
                  </div>
                  <div className={styles["order__info__price__right"]}>
                    {convertPrice(shippingPrice)}
                  </div>
                </div>
                <div className={styles["order__info__price__table"]}>
                  <div className={styles["order__info__price__left"]}>
                    <Translate textKey="purchase.totalPrice" />
                  </div>
                  <div
                    className={styles["order__info__price__right"]}
                    style={{
                      color: "#ff0000",
                      fontSize: "24px",
                      fontWeight: "500",
                    }}
                  >
                    {convertPrice(totalPrice)}
                  </div>
                </div>
                <div className={styles["order__info__price__table"]}>
                  <div className={styles["order__info__price__left"]}>
                    <Translate textKey="purchase.paymentMethod" />
                  </div>
                  <div className={styles["order__info__price__right"]}>
                    <Translate textKey={payment} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles["order__footer"]}>{renderStatus(status)}</div>
      </li>
      {status === OrderStatus.Completed && (
        <Modal
          open={openComment}
          onCancel={handleCancelComment}
          title={commentTitleText}
          footer={null}
          width={700}
        >
          <div className={styles["comments"]}>
            <div className={styles["comments__header"]} />
            <ul className={styles["comments__list"]}>
              {products.map((product) => (
                <Fragment key={product.id}>
                  <OrderComment product={product} />
                </Fragment>
              ))}
            </ul>
            <div className={styles["comments__footer"]}>
              <button
                className={styles["comments__footer__btn"]}
                onClick={handleCancelComment}
                style={{
                  backgroundColor: "transparent",
                  color: "#000",
                }}
              >
                <Translate textKey="purchase.closeBtn" />
              </button>
              <button
                className={styles["comments__footer__btn"]}
                onClick={handleComment}
              >
                <Translate textKey="purchase.commentBtn" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default memo(Order);
