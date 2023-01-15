import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import HeaderBottomLogo from "./HeaderBottomLogo";
import HeaderBottomCart from "./HeaderBottomCart";
import HeaderBottomSearch from "./HeaderBottomSearch";
import HeaderLogin from "../HeaderLogin";
import HeaderLanguage from "../HeaderLanguage";

import styles from "./Header.module.scss";
import headerTopLeft from "~/dataSources/HeaderTopLeft";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header_top"]}>
        <div className={styles["container"]}>
          <ul className={styles["header_top_left"]}>
            {headerTopLeft.map((item) => (
              <li key={item.key} className={styles["header_top_left_item"]}>
                <Link href={item.href} prefetch={false}>
                  <a className={styles["header_top_left_item_link"]}>
                    <Image
                      className={styles["header_top_left_item_link_image"]}
                      src={item.icon}
                      alt="icon"
                      width={16}
                      height={16}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles["header_top_right"]}>
            <HeaderLanguage />
            <HeaderLogin />
          </div>
        </div>
      </div>
      <div className={styles["header-bottom"]}>
        <HeaderBottomLogo />
        <HeaderBottomSearch />
        <div className={styles["header-bottom-right"]}>
          <HeaderBottomCart />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
