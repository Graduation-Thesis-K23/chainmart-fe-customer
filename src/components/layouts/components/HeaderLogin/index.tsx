import React, { memo } from "react";
import Link from "next/link";

import styles from "./HeaderLogin.module.scss";
import useTranslate from "~/hooks/useTranslate";

const HeaderLogin = () => {
  const registerText = useTranslate("header.topRight.register");
  const loginText = useTranslate("header.topRight.login");

  return (
    <div className={styles["header-login"]}>
      <Link href="/register" prefetch={false}>
        <a aria-label="Đăng ký" className={styles["login"]}>
          {registerText}
        </a>
      </Link>
      <Link href="/login" prefetch={false}>
        <a aria-label="Đăng nhập" className={styles["logout"]}>
          {loginText}
        </a>
      </Link>
    </div>
  );
};

export default memo(HeaderLogin);
