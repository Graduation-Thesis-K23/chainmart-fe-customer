import React, { memo } from "react";

import styles from "./HeaderLogin.module.scss";

const HeaderLogin = () => {
  return <div className={styles["header-login"]}>header login</div>;
};

export default memo(HeaderLogin);
