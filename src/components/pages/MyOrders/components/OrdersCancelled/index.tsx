import React, { Fragment, memo } from "react";

import { useAppSelector } from "~/redux";
import Order from "../Order";
import OrdersEmpty from "../OrdersEmpty";

const OrdersCancelled = () => {
  const { data } = useAppSelector((state) => state.orders);

  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((order) => (
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
