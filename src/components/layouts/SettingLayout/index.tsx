import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

import LanguageItem from "../components/HeaderLanguage/LanguageItem";

import logoSquare from "~/assets/images/logo-square.png";
import styles from "./SettingLayout.module.scss";
import useLanguage from "~/hooks/useLocales";

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

const SettingLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <>
      <header className={styles["header"]}>
        <Link href="/">
          <Image src={logoSquare} width={50} height={50} alt="logo" />
        </Link>
        <div className={styles["header_right"]}>
          <div className={styles["header_language"]} id="language">
            <Dropdown
              menu={{ items }}
              placement="bottom"
              getPopupContainer={() =>
                document.getElementById("language") as HTMLElement
              }
            >
              <div className={styles["header_language_wrapper"]}>
                <span className={styles["header_language_selected"]}>
                  {useLanguage("title")}
                </span>
                <CaretDownOutlined className={styles["header_language_icon"]} />
              </div>
            </Dropdown>
          </div>
          <div className={styles["header_vertical"]}></div>
          <div>
            <Image
              className={styles["header_right_avatar"]}
              src="https://lh3.googleusercontent.com/a/AEdFTp51xsRcGBKmxFF50oQEUWJXtnMZ0FHt7IAcSCMh=s96-c"
              width={32}
              height={32}
              alt="avatar"
            />
          </div>
        </div>
      </header>
      {children}
    </>
  );
};

export default memo(SettingLayout);
