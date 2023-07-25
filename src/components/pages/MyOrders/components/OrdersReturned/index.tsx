import React, { Fragment, memo } from "react";

import Order from "../Order";
import { useAppSelector } from "~/redux";
import { Empty } from "antd";
import Translate from "~/components/commons/Translate";

const OrdersReturned = () => {
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
