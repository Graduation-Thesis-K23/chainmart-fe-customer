import React, { memo } from "react";
import { Row, Col } from "antd";
import Image from "next/image";

import styles from "./Login.module.scss";
import banner from "~/assets/login/banner.png";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className={styles["login"]}>
      <div className={styles["login_container"]}>
        <Row className={styles["login_container_row"]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            className={styles["login_container_form"]}
          >
            <LoginForm />
          </Col>
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={12}
            xl={12}
            className={styles["login_container_image"]}
          >
            <Image src={banner} alt="banner" width={339} height={347} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(Login);
