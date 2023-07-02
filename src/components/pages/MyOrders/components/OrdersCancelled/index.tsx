import React, { Fragment, memo, useEffect } from "react";

import { fetchOrders, useAppDispatch, useAppSelector } from "~/redux";
import { OrderStatus } from "~/shared";
import Order from "../Order";
import OrdersEmpty from "../OrdersEmpty";

const OrdersCancelled = () => {
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
        <OrdersEmpty />
      )}
    </div>
  );
};

export default memo(OrdersCancelled);
