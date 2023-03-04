import { GlobalOutlined } from "@ant-design/icons";
import React, { memo } from "react";

import MultiLanguage from "~/components/commons/MultiLanguage";

import styles from "./HeaderLanguage.module.scss";

const HeaderLanguage = () => {
  return (
    <div id="language" className={styles["header_language"]}>
      <GlobalOutlined />
      <MultiLanguage
        container={() => document.getElementById("language") as HTMLElement}
      />
    </div>
  );
};

export default memo(HeaderLanguage);
