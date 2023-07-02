import React, { Fragment, memo, useEffect } from "react";
import Order from "../Order";
import { fetchOrders, useAppDispatch, useAppSelector } from "~/redux";
import { OrderStatus } from "~/shared";
import OrdersEmpty from "../OrdersEmpty";

const OrdersShipping = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders);

  const ordersShipping = orders.data.filter(
    (order) => order.status === OrderStatus.Shipping
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      {ordersShipping.length > 0 ? (
        <ul>
          {ordersShipping.map((order) => (
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

export default memo(OrdersShipping);