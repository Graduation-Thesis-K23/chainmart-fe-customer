// libs
import React from "react";
// components
import Profile from "./Profile";
// others
import styles from "./TopRightAuth.module.scss";

const TopRightAuth = () => {
  const logged = true;

  return <div className={styles["auth-wrapper"]}>{logged && <Profile />}</div>;
};

export default TopRightAuth;
