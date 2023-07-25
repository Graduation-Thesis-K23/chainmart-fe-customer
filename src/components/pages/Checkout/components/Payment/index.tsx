import React, { memo } from "react";

import styles from "./Payment.module.scss";
import Translate from "~/components/commons/Translate";
import { Col, Divider, Row, Tabs } from "antd";
import { CreditCardOutlined, TrademarkOutlined } from "@ant-design/icons";
import useTranslate from "~/hooks/useLocales";
import Link from "next/link";
import { convertPrice } from "~/helpers";
import {
  PlaceOrder,
  clearCart,
  placeOrder,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { useRouter } from "next/router";

const Payment = () => {
  const codText = useTranslate("checkout.cod");
  const atmText = useTranslate("checkout.atm");
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
      key: "1",
    },
    {
      label: (
        <span>
          <CreditCardOutlined />
          Momo/ZaloPay/VNPay
        </span>
      ),
      key: "2",
      disabled: true,
    },
    {
      label: (
        <span>
          <CreditCardOutlined />
          {atmText}
        </span>
      ),
      key: "3",
      disabled: true,
    },
  ];

  const total = ordered.data.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
  const shippingTotal = total > 200000 ? 0 : 30000;

  const dispatch = useAppDispatch();
  const { address_id, note, payment } = useAppSelector(
    (state) => state.checkout
  );
  const { data: carts } = useAppSelector((state) => state.cart);

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
            <Tabs defaultActiveKey="1" items={items} />
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
                <button
                  className={styles["payment__order__btn"]}
                  onClick={() => handlePlaceOrder()}
                >
                  <Translate textKey="checkout.orderBtn" />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default memo(Payment);
