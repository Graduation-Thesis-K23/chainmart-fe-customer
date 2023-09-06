import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Col, Row } from "antd";

import HeaderLoginForm from "./components/HeaderLoginForm";
import HeaderForgotForm from "./components/HeaderForgotForm";
import HeaderRegisterForm from "./components/HeaderRegisterForm";
import HeaderOtpForm from "./components/HeaderOtpForm";

import styles from "./HeaderLogin.module.scss";
import { nunito } from "~/pages/_app";
import Translate from "~/components/commons/Translate";
import banner from "~/assets/login/banner.jpg";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

export const LOGIN_STATE = 1;
export const FORGOT_STATE = 2;
export const REGISTER_STATE = 3;
export const OTP_STATE = 4;

const Login = () => {
  const [formCode, setFormCode] = useState(LOGIN_STATE);
  const [account, setAccount] = useState<string>("");
  const router = useRouter();

  let Form = <HeaderLoginForm setFormCode={setFormCode} />;

  switch (formCode) {
    case LOGIN_STATE:
      Form = <HeaderLoginForm setFormCode={setFormCode} />;
      break;
    case FORGOT_STATE:
      Form = (
        <HeaderForgotForm setFormCode={setFormCode} setAccount={setAccount} />
      );
      break;
    case REGISTER_STATE:
      Form = <HeaderRegisterForm setFormCode={setFormCode} />;
      break;
    case OTP_STATE:
      Form = <HeaderOtpForm setFormCode={setFormCode} account={account} />;
      break;
  }

  const { status } = useAppSelector((state) => state.user);
  const isLoading =
    status === ASYNC_STATUS.SUCCEED || status === ASYNC_STATUS.LOADING;

  useEffect(() => {
    const { mode } = router.query;
    if (mode) {
      setFormCode(parseInt(mode as string));
    }
  }, [router.query]);

  if (isLoading) {
    router.push("/");
  }

  return (
    <div className={classNames(styles["login_container"], nunito.className)}>
      <div className="container">
        <Row className={styles["login_container_row"]}>
          <Col xs={0} sm={0} md={10} lg={10} xl={10}>
            <div className={styles["login_container_image"]}>
              <Image src={banner} alt="banner" width={300} height={300} />
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={14}
            lg={14}
            xl={14}
            className={styles["login_container_form"]}
          >
            {Form}
            <div className={styles["login-notify"]}>
              <span className={styles["login-notify_text"]}>
                <Translate textKey="login.continue" />
              </span>
              <Link
                className={styles["login-notify_link"]}
                href={"/m/terms-of-use"}
              >
                <Translate textKey="login.termsOfUse" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
