import React, { memo } from "react";
import { Tabs } from "antd";

import styles from "./OrdersTabs.module.scss";
import Translate from "~/components/commons/Translate";
import OrdersAll from "../OrdersAll";
import OrdersWaiting from "../OrdersWaiting";
import OrdersDelivered from "../OrdersDelivered";
import OrdersShipping from "../OrdersShipping";
import OrdersCancelled from "../OrdersCancelled";
import OrdersReturned from "../OrdersReturned";

const OrdersTabs = () => {
  const items = [
    {
      label: (
        <span>
          <Translate textKey="purchase.all" />
        </span>
      ),
      key: "1",
      children: <OrdersAll />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.waiting" />
        </span>
      ),
      key: "2",
      children: <OrdersWaiting />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.shipping" />
        </span>
      ),
      key: "3",
      children: <OrdersShipping />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.delivered" />
        </span>
      ),
      key: "4",
      children: <OrdersDelivered />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.cancelled" />
        </span>
      ),
      key: "5",
      children: <OrdersCancelled />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.returned" />
        </span>
      ),
      key: "6",
      children: <OrdersReturned />,
      style: { minHeight: 200 },
    },
  ];

  return (
    <section className={styles["payment"]}>
      <div className="container">
        <div className={styles["payment__container"]}>
          <Tabs defaultActiveKey="1" size="large" items={items} />
        </div>
      </div>
    </section>
  );
};

export default memo(OrdersTabs);
