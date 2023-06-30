import React, { memo } from "react";

import styles from "./OrdersAll.module.scss";

const OrdersAll = () => {
  return <div className={styles["orders-all"]}>Orders All</div>;
};

export default memo(OrdersAll);
