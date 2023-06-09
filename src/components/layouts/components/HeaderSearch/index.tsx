import React, { memo, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

import HeaderSearchItem from "../HeaderSearchItem";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderSearch.module.scss";
import useDebounce from "~/hooks/useDebounce";
import { searchProducts, useAppDispatch, useAppSelector } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";

const HeaderSearch = () => {
  const searchPlaceholder = useTranslate("search.lookingFor");

  const { data } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const searchValueDebounce = useDebounce(searchValue, 400);

  const items: MenuProps["items"] =
    data.length > 0
      ? data.map((item, index) => {
          return {
            key: index,
            label: (
              <HeaderSearchItem
                href={item.slug}
                name={item.name}
                image={
                  item.images
                    ? getS3Image(item.images?.split(",")[0])
                    : undefined
                }
              />
            ),
          };
        })
      : [
          {
            key: "1",
            label: (
              <HeaderSearchItem
                href={"/"}
                name={"notFound.product"}
                image={undefined}
              />
            ),
          },
        ];

  useEffect(() => {
    dispatch(searchProducts(searchValueDebounce));
  }, [dispatch, searchValueDebounce]);

  return (
    <div className={styles["header_search"]} id="header-search">
      <Dropdown
        menu={{ items }}
        placement="bottom"
        trigger={["click"]}
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
