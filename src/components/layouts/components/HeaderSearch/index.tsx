import React, { memo } from "react";
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
        <button className={styles["header_search_btn"]}>
          <SearchOutlined />
        </button>
      </div>
    </div>
  );
};

export default memo(HeaderSearch);
