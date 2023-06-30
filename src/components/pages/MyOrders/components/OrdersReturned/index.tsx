import React, { memo } from "react";

import styles from "./OrdersReturned.module.scss";

const OrdersReturned = () => {
  return <div className={styles["orders-all"]}>OrdersReturned</div>;
};

export default memo(OrdersReturned);
