// libs
import React from "react";
import classNames from "classnames";
// components
import Profile from "./Profile";
import AuthItem from "./AuthItem";
// others
import styles from "./TopRightAuth.module.scss";

const TopRightAuth = () => {
  const logged = false;

  return (
    <div className={styles["auth-wrapper"]}>
      {logged ? (
        <>
          <div className={classNames(styles["auth"], styles["auth-register"])}>
            <AuthItem href="/register" textKey="header.topRight.register" />
          </div>
          |
          <div className={classNames(styles["auth"], styles["auth-login"])}>
            <AuthItem href="/login" textKey="header.topRight.login" />
          </div>
        </>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default TopRightAuth;
