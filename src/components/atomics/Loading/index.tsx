import React, { FC, memo } from "react";

import styles from "./Loading.module.scss";
import classNames from "classnames";

const Loading: FC<{
  display: boolean;
}> = ({ display = false }) => (
  <div
    className={classNames(styles["loading__container"], {
      [styles["block-scroll"]]: display,
    })}
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
