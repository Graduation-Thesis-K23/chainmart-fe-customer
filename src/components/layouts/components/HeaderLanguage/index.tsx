// libs
import React from "react";
// components
import { LanguageIcon, ExpandIcon } from "~/assets/icons";
import { Dropdown } from "antd";
import LanguageItem from "./LanguageItem";
// hooks
import useLanguage from "~/hooks/useTranslate";
// others
import styles from "./HeaderLanguage.module.scss";

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

const HeaderLanguage = () => {
  return (
    <div id="language" className={styles["header_language"]}>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        getPopupContainer={() =>
          document.getElementById("language") as HTMLElement
        }
      >
        <div className={styles["header_language_wrapper"]}>
          <LanguageIcon />
          <span className={styles["header_language_text"]}>
            {useLanguage("title")}
          </span>
          <ExpandIcon />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderLanguage;
