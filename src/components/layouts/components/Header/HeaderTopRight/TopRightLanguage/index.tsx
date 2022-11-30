// libs
import React from "react";
// components
import { LanguageIcon, ExpandIcon } from "~/assets/icons";
import { Dropdown } from "antd";
import LanguageItem from "./LanguageItem";
// hooks
import useLanguage from "~/hooks/useTranslate";
// others
import styles from "./TopRightLanguage.module.scss";

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

const TopRightLanguage = () => {
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
    >
      <div className={styles["top-right-language-wrapper"]}>
        <LanguageIcon />
        <span className={styles["language-text"]}>{useLanguage("title")}</span>
        <ExpandIcon />
      </div>
    </Dropdown>
  );
};

export default TopRightLanguage;
