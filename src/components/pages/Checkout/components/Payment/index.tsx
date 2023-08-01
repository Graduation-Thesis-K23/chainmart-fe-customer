import React, { memo } from "react";

import styles from "./Payment.module.scss";
import Translate from "~/components/commons/Translate";
import { Button, Col, Divider, Row, Tabs } from "antd";
import { CreditCardOutlined, TrademarkOutlined } from "@ant-design/icons";
import useTranslate from "~/hooks/useLocales";
import Link from "next/link";
import { convertPrice } from "~/helpers";
import {
  PlaceOrder,
  clearCart,
  placeOrder,
  setPayment,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { useRouter } from "next/router";
import { Payment } from "~/shared";

const PaymentComponent = () => {
  const codText = useTranslate("checkout.cod");
  const ordered = useAppSelector((state) => state.cart);

  const router = useRouter();

  const items = [
    {
      label: (
        <span>
          <TrademarkOutlined />
          {codText}
        </span>
      ),
      key: Payment.Cash,
    },
    {
      label: (
        <span>
          <CreditCardOutlined />
          Momo/ZaloPay/VNPay
        </span>
      ),
      key: Payment.Banking,
    },
  ];

  const total = ordered.data.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
  const shippingTotal = total > 300000 ? 0 : 30000;

  const dispatch = useAppDispatch();
  const { address_id, note, payment } = useAppSelector(
    (state) => state.checkout
  );
  const { data: carts } = useAppSelector((state) => state.cart);

  const handleChangePaymentMethod = (key: string) => {
    dispatch(setPayment(key as Payment));
    console.log(key);
  };

  const handlePlaceOrder = () => {
    const data: PlaceOrder = {
      order_details: carts.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      address_id,
      note,
      payment,
    };

    dispatch(placeOrder(data));
    dispatch({
      type: clearCart.type,
    });

    // redirect to my orders
    router.push("/purchase");
  };

  return (
    <section className={styles["payment"]}>
      <div className="container">
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
                  disabled={!address_id || !payment}
                  className={styles["payment__order__btn"]}
                  onClick={() => handlePlaceOrder()}
                >
                  <Translate textKey="checkout.orderBtn" />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default memo(PaymentComponent);
