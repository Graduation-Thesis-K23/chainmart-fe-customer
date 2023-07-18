import React, { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import HeaderBottomCart from "../HeaderCart";
import HeaderBottomSearch from "../HeaderSearch";
import HeaderLanguage from "../HeaderLanguage";

import logo from "~/assets/images/logo.png";
import logoSquare from "~/assets/images/logo-square.png";
import styles from "./Header.module.scss";
import headerTopLeft from "~/dataSources/HeaderTopLeft";
import HeaderAuth from "../HeaderAuth";

const Header = () => {
  const [shadow, setShadow] = useState(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 0 && !shadow) {
      setShadow(true);
      return;
    }

    if (scrolled === 0 && shadow) {
      setShadow(false);
      return;
    }
  }, [shadow]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <header
      className={classNames(styles["header"], {
        [styles["header-shadow"]]: shadow,
      })}
    >
      <div className={styles["header_top"]}>
        <div className={styles["container"]}>
          <ul className={styles["header_top_left"]}>
            {headerTopLeft.map((item) => (
              <li key={item.key} className={styles["header_top_left_item"]}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={styles["header_top_left_item_link"]}
                >
                  <Image src={item.icon} alt="icon" width={16} height={16} />
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles["header_top_right"]}>
            <HeaderLanguage />
            <div className="hor-divider" />
            <HeaderAuth />
          </div>
        </div>
      </div>
      <div className={styles["header_bot"]}>
        <div className={styles["container"]}>
          <div className={styles["header_bot_inner"]}>
            <Link
              href="/"
              className={classNames(
                styles["header_bot_logo_rectangle"],
                styles["header_bot_logo"]
              )}
              aria-label="Trang chủ"
            >
              <Image src={logo} width={161} height={51} alt="logo" />
            </Link>
            <Link
              href="/"
              className={classNames(
                styles["header_bot_logo_square"],
                styles["header_bot_logo"]
              )}
              aria-label="Trang chủ"
            >
              <Image
                src={logoSquare}
                width={48}
                height={51}
                alt="logo-square"
              />
            </Link>
            <HeaderBottomSearch />
            <HeaderBottomCart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);