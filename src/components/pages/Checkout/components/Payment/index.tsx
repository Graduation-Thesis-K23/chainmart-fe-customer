import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Divider, Row, Skeleton, Tabs } from "antd";
import { CreditCardOutlined, TrademarkOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./Payment.module.scss";
import Translate from "~/components/commons/Translate";

import useTranslate from "~/hooks/useLocales";
import Link from "next/link";
import { convertPrice } from "~/helpers";
import {
  ASYNC_STATUS,
  OrderType,
  PlaceOrder,
  clearCart,
  placeOrder,
  setCurrentBankingOrder,
  setPayment,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { Payment } from "~/shared";
import BankingTab from "./BankingTab";

const PaymentComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status: loading } = useAppSelector((state) => state.user);
  const { address_id, note, payment } = useAppSelector(
    (state) => state.checkout
  );
  const { data: carts } = useAppSelector((state) => state.cart);
  const ordered = useAppSelector((state) => state.cart);

  const codText = useTranslate("checkout.cod");
  const paymentInAdvanceText = useTranslate("checkout.atm");
  const cashDescription = useTranslate("checkout.cashDescription");

  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;

  const items = [
    {
      label: (
        <span>
          <TrademarkOutlined />
          {codText}
        </span>
      ),
      key: Payment.Cash,
      children: cashDescription,
    },
    {
      label: (
        <span>
          <CreditCardOutlined />
          {paymentInAdvanceText}
        </span>
      ),
      key: Payment.Banking,
      children: <BankingTab setIsCheckoutDisabled={setIsCheckoutDisabled} />,
    },
  ];

  const total = ordered.data.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
  const shippingTotal = total > 300000 ? 0 : 30000;

  const handleChangePaymentMethod = (key: string) => {
    dispatch(setPayment(key as Payment));
    if (key === Payment.Banking) {
      setIsCheckoutDisabled(true);
    } else {
      setIsCheckoutDisabled(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const data: PlaceOrder = {
        order_details: carts.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        address_id,
        note,
        payment,
      };

      const orderResponse = dispatch(placeOrder(data));

      if (payment === Payment.Banking) {
        const order = await orderResponse;
        console.log(order);

        if ("error" in order) {
          toast.error(
            (order.payload as string) ?? "Failed to checkout by Banking"
          );
          return;
        }

        const { id, expiration_timestamp } =
          order.payload as unknown as OrderType;
        dispatch(
          setCurrentBankingOrder({
            id,
            expiration_timestamp,
          })
        );
        router.push(`/checkout/banking?id=${id}`);
      } else {
        // sleep 1s to wait for order to be created
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/purchase");
      }

      dispatch({
        type: clearCart.type,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsCheckoutDisabled(!address_id || !payment);
  }, [address_id]);

  return (
    <section className={styles["payment"]}>
      <div className="container">
        {isLoading ? (
          <div
            style={{
              height: 380,
              width: 1200,
              overflow: "hidden",
            }}
          >
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
          </div>
        ) : (
          <div className={styles["payment__container"]}>
            <p className={styles["payment__title"]}>
              <Translate textKey="checkout.payment" />
            </p>
            <div>
              <Tabs
                defaultActiveKey={Payment.Cash}
                items={items}
                onChange={handleChangePaymentMethod}
              />
            </div>
            <div className={styles["payment__items"]}>
              <div className={styles["payment__item"]}>
                <div className={styles["payment__item__title"]}>
                  <Translate textKey="checkout.total" />
                </div>
                <p className={styles["payment__item__value"]}>
                  {convertPrice(total)}
                </p>
              </div>
              <div className={styles["payment__item"]}>
                <div className={styles["payment__item__title"]}>
                  <Translate textKey="checkout.shippingTotal" />
                </div>
                <p className={styles["payment__item__value"]}>
                  {convertPrice(shippingTotal)}
                </p>
              </div>
              <div className={styles["payment__item"]}>
                <div className={styles["payment__item__title"]}>
                  <Translate textKey="checkout.totalPayment" />
                </div>
                <p className={styles["payment__item__price"]}>
                  {convertPrice(total + shippingTotal)}
                </p>
              </div>
            </div>
            <Divider />
            <Row className={styles["payment__order"]}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["payment__order__text"]}>
                  <Translate textKey="checkout.policy" />
                  <Link
                    className={styles["payment__order__link"]}
                    href="/m/terms-and-condition"
                  >
                    {" "}
                    <Translate textKey="termsAndCondition" />
                  </Link>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["payment__order__bt"]}>
                  <Button
                    disabled={isCheckoutDisabled}
                    className={styles["payment__order__btn"]}
                    onClick={() => handlePlaceOrder()}
                  >
                    <Translate textKey="checkout.orderBtn" />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(PaymentComponent);
