import React, { memo, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Dropdown, MenuProps, Space } from "antd";

import HeaderSearchItem from "../HeaderSearchItem";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderSearch.module.scss";
import getS3Image from "~/helpers/get-s3-image";
import useDebounce from "~/hooks/useDebounce";

const HeaderSearch = () => {
  const searchPlaceholder = useTranslate("search.lookingFor");

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchValueDebounce = useDebounce(searchValue, 400);

  const items: MenuProps["items"] = [
    /* {
      key: "4",
      label: (
        <HeaderSearchItem
          href="/s"
          image={getS3Image("2b96d51e")}
          name="Bột Rau Quả True Vegie (Bổ sung rau / Giảm táo bón / Giảm nóng trong) - 1 gói 300g - 30 lần dùng"
        />
      ),
    }, */
  ];

  const handleOnFocus = () => {
    setOpenDropdown(true);
  };

  const handleOnBlur = () => {
    setOpenDropdown(false);
  };

  useEffect(() => {
    console.log(searchValueDebounce);
  }, [searchValueDebounce]);

  return (
    <div className={styles["header_search"]} id="header-search">
      <Dropdown
        menu={{ items }}
        placement="bottom"
        open={openDropdown}
        getPopupContainer={() =>
          document.getElementById("header-search") as HTMLElement
        }
      >
        <div className={styles["header_search_inner"]}>
          <input
            className={styles["header_search_input"]}
            spellCheck={false}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
          <button className={styles["header_search_btn"]}>
            <SearchOutlined />
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(HeaderSearch);
