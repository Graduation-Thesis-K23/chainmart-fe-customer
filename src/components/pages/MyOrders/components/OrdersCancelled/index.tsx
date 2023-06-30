import React, { memo } from "react";

import styles from "./OrdersCancelled.module.scss";

const OrdersCancelled = () => {
  return <div className={styles["orders-all"]}>OrdersCancelled</div>;
};

export default memo(OrdersCancelled);
