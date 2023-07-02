import React, { Fragment, memo, useEffect } from "react";

import Order from "../Order";
import { fetchOrders, useAppDispatch, useAppSelector } from "~/redux";
import { OrderStatus } from "~/shared";
import OrdersEmpty from "../OrdersEmpty";

const OrdersDelivered = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders);

  const ordersCompleted = orders.data.filter(
    (order) => order.status === OrderStatus.Completed
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      {ordersCompleted.length > 0 ? (
        <ul>
          {ordersCompleted.map((order) => (
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

export default memo(OrdersDelivered);
