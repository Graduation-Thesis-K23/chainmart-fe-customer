import React, { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import HeaderBottomCart from "../HeaderCart";
import HeaderBottomSearch from "../HeaderSearch";
import HeaderUser from "../HeaderUser";
import HeaderLanguage from "../HeaderLanguage";
import HeaderLogin from "../HeaderLogin";

import logo from "~/assets/images/logo.png";
import logoSquare from "~/assets/images/logo-square.png";

import styles from "./Header.module.scss";
import headerTopLeft from "~/dataSources/HeaderTopLeft";

const Header = () => {
  const logged = true;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="hor-divider" />
            {logged ? <HeaderUser /> : <HeaderLogin />}
          </div>
        </div>
      </div>
      <div className={styles["header_bot"]}>
        <div className={styles["container"]}>
          <div className={styles["header_bot_inner"]}>
            <Link href="/">
              <a
                className={classNames(
                  styles["header_bot_logo_rectangle"],
                  styles["header_bot_logo"]
                )}
                aria-label="Trang chủ"
              >
                <Image src={logo} width={161} height={51} alt="logo" />
              </a>
            </Link>
            <Link href="/">
              <a
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
              </a>
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
