import React, { memo } from "react";

import styles from "./AddressItem.module.scss";

const AddressItem = () => {
  return <div className={styles["address-item"]}>AddressItem</div>;
};

export default memo(AddressItem);
