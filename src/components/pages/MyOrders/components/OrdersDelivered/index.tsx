import React, { memo } from "react";

import styles from "./OrdersDelivered.module.scss";

const OrdersDelivered = () => {
  return <div className={styles["orders-all"]}>OrdersDelivered</div>;
};

export default memo(OrdersDelivered);
