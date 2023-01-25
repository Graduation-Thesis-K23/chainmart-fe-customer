import React, { memo } from "react";
import Link from "next/link";

import styles from "./HeaderLogin.module.scss";
import useTranslate from "~/hooks/useTranslate";

const HeaderLogin = () => {
  const registerText = useTranslate("header.topRight.register");
  const loginText = useTranslate("header.topRight.login");

  return (
    <div className={styles["header-login"]}>
      <Link
        href="/register"
        prefetch={false}
        aria-label="Đăng ký"
        className={styles["login"]}
      >
        <span>{registerText}</span>
      </Link>
      <Link
        href="/login"
        prefetch={false}
        aria-label="Đăng nhập"
        className={styles["logout"]}
      >
        <span>{loginText}</span>
      </Link>
    </div>
  );
};

export default memo(HeaderLogin);
