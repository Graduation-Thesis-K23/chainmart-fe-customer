import React, { memo, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

import HeaderSearchItem from "../HeaderSearchItem";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderSearch.module.scss";
import useDebounce from "~/hooks/useDebounce";
import { searchProducts, useAppDispatch, useAppSelector } from "~/redux";
import getS3Image from "~/helpers/get-s3-image";
import { useRouter } from "next/router";

const HeaderSearch = () => {
  const searchPlaceholder = useTranslate("search.lookingFor");
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const { data } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const searchValueDebounce = useDebounce(searchValue, 400);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/search",
        query: { keyword: searchValue },
      });

      setOpen(false);
    }
  };

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
        open={open}
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
            onKeyDown={(e) => handleEnterPress(e)}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              setTimeout(() => {
                setOpen(false);
              }, 200);
            }}
          />
          <button
            className={styles["header_search_btn"]}
            onClick={() => {
              router.push({
                pathname: "/search",
                query: { keyword: searchValue },
              });
            }}
          >
            <SearchOutlined />
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(HeaderSearch);
