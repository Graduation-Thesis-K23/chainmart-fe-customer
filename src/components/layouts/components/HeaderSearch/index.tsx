import React, { memo } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderSearch.module.scss";

const HeaderSearch = () => {
  const searchPlaceholder = useTranslate("search.lookingFor");

  return (
    <div className={styles["header_search"]} id="header-search">
      <div className={styles["header_search_inner"]}>
        <input
          className={styles["header_search_input"]}
          spellCheck={false}
          placeholder={searchPlaceholder}
        />
        <Button
          className={styles["header_search_btn"]}
          icon={<SearchOutlined />}
        />
      </div>
    </div>
  );
};

export default memo(HeaderSearch);
