import React, { FC, memo } from "react";

import styles from "./Loading.module.scss";

const Loading: FC<{
  display: boolean;
}> = ({ display = false }) => (
  <div
    className={styles["loading__container"]}
    style={{
      display: display ? "block" : "none",
    }}
  >
    <div className={styles["lds-roller"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default memo(Loading);
