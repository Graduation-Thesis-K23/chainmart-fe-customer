// libs
import React from "react";
import { Button, Dropdown } from "antd";
// components
import { SearchIcon } from "~/assets/icons";
import TextLink from "~/components/atomics/TextLink";
// hooks
import useLanguage from "~/hooks/useTranslate";
// others
import styles from "./BottomSearch.module.scss";

const items = [
  {
    key: "1",
    label: (
      <TextLink
        href={{
          pathname: "/search",
          query: {
            q: "react",
          },
        }}
        text="123"
      />
    ),
  },
  {
    key: "2",
    label: (
      <TextLink
        href={{
          pathname: "/search",
          query: {
            q: "react",
          },
        }}
        text="asd"
      />
    ),
  },
];

const BottomSearch = () => {
  const searchPlaceholder = useLanguage("search.lookingFor");

  return (
    <div className={styles["bottom-search-wrapper"]} id="header-search">
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottom"
        overlayStyle={{ borderRadius: 0 }}
        getPopupContainer={() =>
          document.getElementById("header-search") as HTMLElement
        }
      >
        <div className={styles["bottom-search-inner"]}>
          <input
            className={styles["search-input"]}
            spellCheck={false}
            placeholder={searchPlaceholder}
          />
          <Button className={styles["search-btn"]} icon={<SearchIcon />} />
        </div>
      </Dropdown>
    </div>
  );
};

export default BottomSearch;
