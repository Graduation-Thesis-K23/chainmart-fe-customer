import React from "react";
import { useRouter } from "next/router";

import HeaderUser from "../HeaderUser";
import Translate from "~/components/commons/Translate";
import { LOGIN_STATE, REGISTER_STATE } from "~/components/pages/Login";

import { useAppSelector, ASYNC_STATUS } from "~/redux";
import styles from "./HeaderLogin.module.scss";

const HeaderAuth = () => {
  const { status, data } = useAppSelector((state) => state.user);

  const router = useRouter();

  const handleAuth = (state: boolean, mode: number) => {
    router.push({
      pathname: "/login",
      query: { mode },
    });
  };

  return (
    <>
      {status === ASYNC_STATUS.SUCCEED ? (
        <HeaderUser user={data} />
      ) : (
        <div className={styles["header-login"]}>
          <button
            className={styles["login-btn"]}
            aria-label="Đăng ký"
            onClick={() => handleAuth(true, REGISTER_STATE)}
          >
            <span>
              <Translate textKey="header.topRight.register" />
            </span>
          </button>
          <button
            className={styles["logout-btn"]}
            aria-label="Đăng nhập"
            onClick={() => handleAuth(true, LOGIN_STATE)}
          >
            <span>
              <Translate textKey="header.topRight.login" />
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderAuth;
