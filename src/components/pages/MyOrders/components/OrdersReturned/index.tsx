import React, { Fragment, memo, useEffect } from "react";

import Order from "../Order";
import { fetchOrders, useAppDispatch, useAppSelector } from "~/redux";
import { OrderStatus } from "~/shared";
import { Empty } from "antd";
import Translate from "~/components/commons/Translate";

const OrdersReturned = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders);

  const ordersPrepare = orders.data.filter(
    (order) => order.status === OrderStatus.Cancelled
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      {ordersPrepare.length > 0 ? (
        <ul>
          {ordersPrepare.map((order) => (
            <Fragment key={order.id}>
              <Order {...order} />
            </Fragment>
          ))}
        </ul>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "500px",
            backgroundColor: "#fff",
          }}
        >
          <Empty description={<Translate textKey="purchase.returnEmpty" />} />
        </div>
      )}
    </div>
  );
};

export default memo(OrdersReturned);
