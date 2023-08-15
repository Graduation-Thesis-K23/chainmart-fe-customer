import React, { FC, Fragment, memo, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import {
  Alert,
  Button,
  Col,
  Grid,
  Popconfirm,
  Row,
  Space,
  Steps,
  Typography,
} from "antd";
import {
  CloseOutlined,
  GiftOutlined,
  ImportOutlined,
  LoadingOutlined,
  PartitionOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import styles from "./Order.module.scss";
import {
  OrderType,
  cancelBankingOrder,
  cancelOrder,
  receivedOrder,
  useAppDispatch,
} from "~/redux";
import Translate from "~/components/commons/Translate";
import getS3Image from "~/helpers/get-s3-image";
import { convertPrice, convertTimestamp, discount } from "~/helpers";
import { OrderStatus, Payment, PaymentStatus } from "~/shared";
import useTranslate from "~/hooks/useLocales";
import OrderCommentModal from "../OrderCommentModal";
import Timer from "~/components/pages/Momo/components/Timer";

const { useBreakpoint } = Grid;

enum StepStatus {
  Wait = "wait",
  Process = "process",
  Finish = "finish",
  Error = "error",
}

const calculateCurrentStep = (
  approved_date: Date | undefined,
  packaged_date: Date | undefined,
  started_date: Date | undefined,
  completed_date: Date | undefined,
  returned_date: Date | undefined
) => {
  if (returned_date) return 6;
  if (completed_date) return 5;
  if (started_date) return 4;
  if (packaged_date) return 3;
  if (approved_date) return 2;
  return 1;
};

const Order: FC<OrderType> = ({
  id,
  created_at,
  address,
  approved_date,
  returned_date,
  completed_date,
  cancelled_date,
  packaged_date,
  started_date,
  status,
  payment,
  received_date,
  order_details,
  rating_date,
  order_code,
  payment_status,
  expiration_timestamp,
}) => {
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();

  const cancelOrderText = useTranslate("purchase.cancelOrderText");
  const createAtText = useTranslate("purchase.stepsCreateAt");
  const payText = useTranslate("purchase.stepsPay");
  const approvedText = useTranslate("purchase.stepsApprovedAt");
  const shippingText = useTranslate("purchase.stepsShippingAt");
  const packagedText = useTranslate("purchase.stepsPackagedAt");
  const completedText = useTranslate("purchase.stepsCompletedAt");
  const returnText = useTranslate("purchase.stepsReturnedAt");
  const cancelText = useTranslate("purchase.stepsCancelledAt");
  const orderStatusText = useTranslate("purchase.orderStatus");
  const paymentStatusText = useTranslate("purchase.paymentStatus");
  const cancelBtnText = useTranslate("purchase.cancelBtn");
  const payBtnText = useTranslate("purchase.payBtn");
  const paymentText = useTranslate(payment);

  const [isFinished, setIsFinished] = useState(false);

  const expiryTimestamp = new Date(expiration_timestamp);
  const isBankingOrder = payment === Payment.Banking;
  const isOrderInProcessing =
    isBankingOrder &&
    status === OrderStatus.Created &&
    payment_status === PaymentStatus.Unpaid &&
    expiryTimestamp > new Date();

  const handleCancelOrder = async () => {
    if (isBankingOrder) {
      await dispatch(cancelBankingOrder(id));
    } else {
      await dispatch(cancelOrder(id));
    }
  };

  const handleReceivedOrder = () => {
    dispatch(receivedOrder(id));
  };

  const moveToMomoPage = () => {
    Router.push(`/checkout/momo?id=${id}`);
  };

  const [openComment, setOpenComment] = useState(false);

  /*  const handleReturnOrder = () => {
    dispatch(returnOrder(id));
  }; */

  /* const handleResell = () => {
    console.log("resell");
    dispatch(resellOrder(id));
  };
 */
  const handleCancelComment = () => {
    setOpenComment(false);
  };

  const handleComment = () => {
    setOpenComment(true);
  };

  const stepsItem = useMemo(() => {
    const currentStep = calculateCurrentStep(
      approved_date,
      packaged_date,
      started_date,
      completed_date,
      returned_date
    );

    /* 
      0. Cancelled
      1. Created
      2. Approved
      3: Packaged
      4. Started
      5. Completed
      6. Returned
    */

    const items: {
      title: string;
      status: "wait" | "process" | "finish" | "error" | undefined;
      icon: React.ReactNode;
      description: React.ReactNode | string | null;
    }[] = [
      {
        title: createAtText,
        status: StepStatus.Finish,
        icon: (
          <ShoppingCartOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: convertTimestamp(created_at),
      },
      {
        title: approvedText,
        status: currentStep > 1 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <SolutionOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: approved_date ? convertTimestamp(approved_date) : null,
      },
      {
        title: packagedText,
        status: currentStep > 2 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <GiftOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: packaged_date ? convertTimestamp(packaged_date) : null,
      },
      {
        title: shippingText,
        status: currentStep > 3 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <PartitionOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: started_date ? convertTimestamp(started_date) : null,
      },
      {
        title: completedText,
        status: currentStep > 4 ? StepStatus.Finish : StepStatus.Wait,
        icon: (
          <ImportOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: completed_date ? convertTimestamp(completed_date) : null,
      },
    ];

    if (cancelled_date) {
      items.push({
        title: cancelText,
        status: StepStatus.Error,
        icon: (
          <CloseOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: cancelled_date ? convertTimestamp(cancelled_date) : null,
      });
    }

    if (returned_date) {
      items.push({
        title: returnText,
        status: StepStatus.Error,
        icon: (
          <CloseOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: returned_date ? convertTimestamp(returned_date) : null,
      });
    }

    if (isOrderInProcessing) {
      items.splice(1, 0, {
        title: payText,
        status: currentStep > 1 ? StepStatus.Finish : StepStatus.Process,
        icon: (
          <LoadingOutlined
            style={{
              fontSize: 30,
            }}
          />
        ),
        description: (
          <Timer
            expiryTimestamp={expiryTimestamp}
            orderId={id}
            setIsFailed={setIsFinished}
          />
        ),
      });
    }

    return items;
  }, [isOrderInProcessing]);

  const productsPrice = useMemo(() => {
    return order_details.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  }, [order_details]);

  const shippingPrice = useMemo(() => {
    return productsPrice > 300000 ? 0 : 30000;
  }, [productsPrice]);

  const totalPrice = useMemo(() => {
    return productsPrice + shippingPrice;
  }, [productsPrice, shippingPrice]);

  const renderStatus = (status: string) => {
    switch (status) {
      /* case OrderStatus.Approved || OrderStatus.Packaged:
        return (
          <div className={styles["order__footer__prepare"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleCancelOrder}
            >
              <Translate textKey="purchase.cancelBtn" />
            </button>
          </div>
        ); */
      case OrderStatus.Started:
        return (
          <>
            {received_date && (
              <div className={styles["order__footer__shipping"]}>
                <button
                  className={styles["order__footer__btn"]}
                  onClick={handleReceivedOrder}
                >
                  <Translate textKey="purchase.shippingBtn" />
                </button>
              </div>
            )}
          </>
        );
      case OrderStatus.Completed:
        return (
          <>
            {!rating_date && (
              <div className={styles["order__footer__delivered"]}>
                <button
                  className={styles["order__footer__btn"]}
                  onClick={handleComment}
                >
                  <Translate textKey="purchase.deliveredBtn" />
                </button>
                {/*                 <button
                  className={styles["order__footer__btn"]}
                  onClick={handleReturnOrder}
                >
                  <Translate textKey="purchase.returnedBtn" />
                </button> */}
              </div>
            )}
          </>
        );
      case OrderStatus.Cancelled:
        return null /* (
          <div className={styles["order__footer__cancelled"]}>
            <button
              className={styles["order__footer__btn"]}
              onClick={handleResell}
            >
              <Translate textKey="purchase.cancelledBtn" />
            </button>
          </div>
        ) */;
      case OrderStatus.Returned:
        return null;
      default:
        return (
          <div className={styles["order__footer__waiting"]}>
            <Popconfirm
              placement="topLeft"
              title={cancelOrderText}
              onConfirm={handleCancelOrder}
              okText={<Translate textKey="yes" />}
              cancelText={<Translate textKey="no" />}
            >
              <Button danger>{cancelBtnText}</Button>
            </Popconfirm>
            {isOrderInProcessing && (
              <Button
                type="primary"
                onClick={moveToMomoPage}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#2da85c",
                }}
              >
                {payBtnText}
              </Button>
            )}
          </div>
        );
    }
  };

  const orderStatusType: {
    [key: string]: "success" | "error" | "warning" | "info";
  } = {
    [OrderStatus.Approved]: "success",
    [OrderStatus.Completed]: "success",
    [OrderStatus.Cancelled]: "error",
    [OrderStatus.Returned]: "error",
    [OrderStatus.Packaged]: "warning",
    [OrderStatus.Created]: "info",
    [OrderStatus.Started]: "info",
  };

  const paymentStatusType: {
    [key: string]: "success" | "error" | "warning" | "info";
  } = {
    [PaymentStatus.Unpaid]: "info",
    [PaymentStatus.Failed]: "error",
    [PaymentStatus.Paid]: "success",
    [PaymentStatus.Processing]: "warning",
  };

  return (
    <>
      <li
        className={`${styles["order"]} ${
          isOrderInProcessing ? styles["order--is-processing"] : ""
        }`}
        id={id}
      >
        <div className={styles["order__header"]}>
          <Space direction="vertical">
            <div className={styles["order__header__id"]}>
              <Translate textKey="purchase.orderId" />:{" "}
              <span className={styles["order__header__id__text"]}>
                {order_code}
              </span>
            </div>
            <div className={styles["order__header__id"]}>
              <Translate textKey="purchase.paymentMethod" />:{" "}
              <span className={styles["order__header__id__text"]}>
                {paymentText}
              </span>
            </div>
          </Space>
          <Space
            direction="vertical"
            align={screens.sm ? "end" : "start"}
            style={{ rowGap: 10, columnGap: 10 }}
          >
            <Space direction="horizontal">
              <Typography.Text>{orderStatusText}</Typography.Text>
              <Alert
                message={<Translate textKey={status} />}
                type={orderStatusType[status]}
                style={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              />
            </Space>
            {isBankingOrder && (
              <Space direction="horizontal">
                <Typography.Text>{paymentStatusText}</Typography.Text>
                <Alert
                  message={<Translate textKey={payment_status} />}
                  type={paymentStatusType[payment_status]}
                  style={{
                    textTransform: "uppercase",
                    fontWeight: 600,
                    width: "fit-content",
                  }}
                />
              </Space>
            )}
          </Space>
        </div>

        <div className={styles["order__steps"]}>
          <Steps items={stepsItem} labelPlacement="vertical" size="small" />
        </div>

        <ul className={styles["order__list"]}>
          {order_details.map((product) => (
            <Fragment key={product.product_id}>
              <li className={styles["order__list__item"]}>
                <div className={styles["order__list__item__image"]}>
                  <Image
                    src={getS3Image(product.product.image)}
                    alt={product.product.name}
                    width={90}
                    height={90}
                  />
                </div>
                <div className={styles["order__list__item__nq"]}>
                  <Link
                    href={`/${product.product.slug}`}
                    className={styles["order__list__item__nq__name"]}
                    as={`/${product.product.slug}`}
                  >
                    {product.product.name}
                  </Link>
                  <p className={styles["order__list__item__nq__quantity"]}>
                    x{product.quantity}
                  </p>
                </div>
                <div className={styles["order__list__item__price"]}>
                  {product.product.sale > 0 ? (
                    <>
                      <span className={styles["order__list__item__price__2"]}>
                        {convertPrice(
                          discount(product.product.price, product.product.sale)
                        )}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}{" "}
                  <span className={styles["order__list__item__price__1"]}>
                    {convertPrice(product.product.price)}
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
        <OrderCommentModal
          openComment={openComment}
          handleCancelComment={handleCancelComment}
          products={order_details}
          order_id={id}
        />
      )}
    </>
  );
};

export default memo(Order);
