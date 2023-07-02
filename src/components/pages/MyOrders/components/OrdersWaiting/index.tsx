import React, { Fragment, memo, useEffect } from "react";

import { fetchOrders, useAppDispatch, useAppSelector } from "~/redux";
import Order from "../Order";
import { OrderStatus } from "~/shared";
import OrdersEmpty from "../OrdersEmpty";

const OrdersWaiting = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders);

  const ordersWaiting = orders.data.filter(
    (order) => order.status === OrderStatus.Processing
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      {ordersWaiting.length > 0 ? (
        <ul>
          {ordersWaiting.map((order) => (
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

export default memo(OrdersWaiting);
