import React, { memo } from "react";

import styles from "./OrdersWaiting.module.scss";

const OrdersWaiting = () => {
  return <div className={styles["orders-waiting"]}>OrdersWaiting</div>;
};

export default memo(OrdersWaiting);
