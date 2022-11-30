// libs
import React from "react";
// components
import ImageLink from "~/components/atomics/ImageLink";
// others
import logo from "~/assets/images/logo.png";
import styles from "./BottomLogo.module.scss";

const BottomLogo = () => (
  <div className={styles["header-bottom-logo"]}>
    <ImageLink href="/" src={logo} width={161} height={30} alt="logo" />
  </div>
);

export default BottomLogo;
