// libs
import React from "react";
// components
import HeaderTopLeft from "./HeaderTopLeft";
import HeaderTopRight from "./HeaderTopRight";
import HeaderBottomLogo from "./HeaderBottomLogo";
import HeaderBottomCart from "./HeaderBottomCart";
import HeaderBottomSearch from "./HeaderBottomSearch";
// others
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-inner"]}>
        <div className={styles["header-top"]}>
          <HeaderTopLeft />
          <HeaderTopRight />
        </div>
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
