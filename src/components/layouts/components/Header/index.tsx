// libs
import React from "react";
import { Row, Col } from "antd";

import HeaderBottomLogo from "./HeaderBottomLogo";
import HeaderBottomCart from "./HeaderBottomCart";
import HeaderBottomSearch from "./HeaderBottomSearch";
// others
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-inner"]}>
        <div className={styles["header-bottom"]}>
          <HeaderBottomLogo />
          <HeaderBottomSearch />
          <HeaderBottomCart />
        </div>
      </div>
    </div>
  );
};

export default Header;
