import React, { memo } from "react";
import { Button, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import SearchPopup from "./SearchPopup";
import useTranslate from "~/hooks/useTranslate";
import styles from "./HeaderSearch.module.scss";

const HeaderSearch = () => {
  const searchPlaceholder = useTranslate("search.lookingFor");

  return (
    <div className={styles["header_search"]} id="header-search">
      <Popover
        content={SearchPopup}
        trigger={["click"]}
        placement="bottom"
        showArrow={false}
        overlayStyle={{
          padding: 0,
          width: "",
        }}
        getPopupContainer={() =>
          document.getElementById("header-search") as HTMLElement
        }
      >
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
      </Popover>
    </div>
  );
};

export default memo(HeaderSearch);
