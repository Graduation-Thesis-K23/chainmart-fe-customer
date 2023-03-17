import React, { memo } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

import LanguageItem from "./LanguageItem";

import styles from "./MultiLanguage.module.scss";
import Translate from "../Translate";

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

const MultiLanguage: React.FC<{
  container?: (triggerNode: HTMLElement) => HTMLElement;
}> = ({ container = () => document.getElementsByTagName("body")[0] }) => {
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      getPopupContainer={container}
    >
      <div className={styles["language"]}>
        <span className={styles["language_selected"]}>
          <Translate textKey="title" />
        </span>
        <CaretDownOutlined className={styles["language_icon"]} />
      </div>
    </Dropdown>
  );
};

export default memo(MultiLanguage);
