import React, { memo, useState } from "react";
import { Modal, Row, Col } from "antd";
import Image from "next/image";
import classNames from "classnames";
import { CloseCircleOutlined } from "@ant-design/icons";

import HeaderLoginForm from "../HeaderLoginForm";
import HeaderForgotForm from "../HeaderForgotForm";
import HeaderRegisterForm from "../HeaderRegisterForm";
import HeaderOtpForm from "../HeaderOtpForm";

import banner from "~/assets/login/banner.jpg";
import styles from "./HeaderLogin.module.scss";
import Link from "next/link";
import { nunito } from "~/pages/_app";
import Translate from "~/components/commons/Translate";

export const LOGIN_STATE = 1;
export const FORGOT_STATE = 2;
export const REGISTER_STATE = 3;
export const OTP_STATE = 4;

const HeaderLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formCode, setFormCode] = useState(LOGIN_STATE);
  const [account, setAccount] = useState<string>("");

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

  const handleModal = (state: boolean, mode: number) => {
    setFormCode(mode);
    setIsModalOpen(state);
  };

  return (
    <div className={styles["header-login"]}>
      <button
        className={styles["login-btn"]}
        aria-label="Đăng ký"
        onClick={() => handleModal(true, REGISTER_STATE)}
      >
        <span>
          <Translate textKey="header.topRight.register" />
        </span>
      </button>
      <button
        className={styles["logout-btn"]}
        aria-label="Đăng nhập"
        onClick={() => handleModal(true, LOGIN_STATE)}
      >
        <span>
          <Translate textKey="header.topRight.login" />
        </span>
      </button>
      <Modal
        open={isModalOpen}
        onCancel={() => handleModal(false, LOGIN_STATE)}
        footer={null}
        centered
        width={800}
        closeIcon={
          <div className={styles["close-btn-container"]}>
            <CloseCircleOutlined className={styles["close-btn"]} />
          </div>
        }
      >
        <div
          className={classNames(styles["login_container"], nunito.className)}
        >
          <Row className={styles["login_container_row"]}>
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
            <Col xs={0} sm={0} md={10} lg={10} xl={10}>
              <div className={styles["login_container_image"]}>
                <Image src={banner} alt="banner" width={300} height={300} />
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default memo(HeaderLogin);
