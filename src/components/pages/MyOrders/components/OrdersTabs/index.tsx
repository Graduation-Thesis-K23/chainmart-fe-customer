import React, { memo, useEffect } from "react";
import { Tabs } from "antd";

import styles from "./OrdersTabs.module.scss";
import Translate from "~/components/commons/Translate";
import OrdersAll from "../OrdersAll";
import OrdersWaiting from "../OrdersWaiting";
import OrdersDelivered from "../OrdersDelivered";
import OrdersShipping from "../OrdersShipping";
import OrdersCancelled from "../OrdersCancelled";
import OrdersReturned from "../OrdersReturned";
import OrdersPrepare from "../OrdersPrepare";
import { OrderStatus } from "~/shared";
import {
  fetchOrders,
  setActiveKey,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import OrdersPackaged from "../OrdersPackaged";
import OrdersRated from "../OrdersRated";

const OrdersTabs = () => {
  const activeKey = useAppSelector((state) => state.orders.activeKey);
  const dispatch = useAppDispatch();

  const handleSetActiveKey = (key: string) => {
    dispatch(setActiveKey(key));
  };

  const items = [
    {
      label: (
        <span>
          <Translate textKey="purchase.all" />
        </span>
      ),
      key: "all",
      children: <OrdersAll />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.waiting" />
        </span>
      ),
      key: OrderStatus.Created,
      children: <OrdersWaiting />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.prepare" />
        </span>
      ),
      key: OrderStatus.Approved,
      children: <OrdersPrepare />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.packaged" />
        </span>
      ),
      key: OrderStatus.Packaged,
      children: <OrdersPackaged />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.shipping" />
        </span>
      ),
      key: OrderStatus.Started,
      children: <OrdersShipping />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.delivered" />
        </span>
      ),
      key: OrderStatus.Completed,
      children: <OrdersDelivered />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.cancelled" />
        </span>
      ),
      key: OrderStatus.Cancelled,
      children: <OrdersCancelled />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.returned" />
        </span>
      ),
      key: OrderStatus.Returned,
      children: <OrdersReturned />,
      style: { minHeight: 200 },
    },
    {
      label: (
        <span>
          <Translate textKey="purchase.rated" />
        </span>
      ),
      key: "Rated",
      children: <OrdersRated />,
      style: { minHeight: 200 },
    },
  ];

  useEffect(() => {
    if (activeKey === "Rated") {
      return;
    }
    dispatch(fetchOrders(activeKey));
  }, [dispatch, fetchOrders, activeKey]);

  return (
    <section className={styles["payment"]}>
      <div className="container">
        <div className={styles["payment__container"]}>
          <Tabs
            defaultActiveKey="all"
            activeKey={activeKey}
            size="large"
            items={items}
            onChange={(key) => handleSetActiveKey(key)}
            tabBarStyle={{
              backgroundColor: "#fff",
              padding: "0 20px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(OrdersTabs);
