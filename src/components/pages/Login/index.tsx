import React, { memo } from "react";
import { Row, Col, Dropdown } from "antd";
import Image from "next/image";

import styles from "./Login.module.scss";
import banner from "~/assets/login/banner.png";
import LoginForm from "./components/LoginForm";
import { CaretDownOutlined } from "@ant-design/icons";
import LanguageItem from "~/components/layouts/components/HeaderLanguage/LanguageItem";
import useTranslate from "~/hooks/useLocales";

const items = [
  {
    key: "1",
    label: <LanguageItem languageKey="vi" text="Việt Nam" />,
  },
  {
    key: "2",
    label: <LanguageItem languageKey="en" text="English" />,
  },
];

const Login = () => {
  const languageSelected = useTranslate("title");

  return (
    <div className={styles["login"]}>
      <div className={styles["login_language"]} id="language">
        <Dropdown
          menu={{ items }}
          placement="bottom"
          getPopupContainer={() =>
            document.getElementById("language") as HTMLElement
          }
        >
          <div className={styles["login_language_wrapper"]}>
            <span className={styles["login_language_selected"]}>
              {languageSelected}
            </span>
            <CaretDownOutlined className={styles["login_language_icon"]} />
          </div>
        </Dropdown>
      </div>
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
