// libs
import React from "react";

import HeaderBottomLogo from "./HeaderBottomLogo";
import HeaderBottomCart from "./HeaderBottomCart";
import HeaderBottomSearch from "./HeaderBottomSearch";
import TopRightAuth from "./HeaderTopRight/TopRightAuth";
// others
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-inner"]}>
        <div className={styles["header-bottom"]}>
          <HeaderBottomLogo />
          <HeaderBottomSearch />
          <div className={styles["header-bottom-right"]}>
            <HeaderBottomCart />
            <TopRightAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
