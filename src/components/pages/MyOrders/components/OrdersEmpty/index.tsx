import React, { memo } from "react";

import styles from "./OrdersEmpty.module.scss";
import { Empty } from "antd";
import Translate from "~/components/commons/Translate";

const OrdersEmpty = () => (
  <div className={styles["orders__empty"]}>
    <Empty description={<Translate textKey="purchase.orderEmpty" />} />
  </div>
);

export default memo(OrdersEmpty);
