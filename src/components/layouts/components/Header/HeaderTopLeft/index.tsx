import React from "react";
import Link from "next/link";

import headerTopLeft from "~/dataSources/HeaderTopLeft";

import styles from "./TopLeft.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const HeaderTopLeft = () => {
  return (
    <ul className={styles["header-top-left"]}>
      {headerTopLeft.map(({ key, href, textKey }) => (
        <li key={key} className={styles["top-item"]}>
          <Link href={href} prefetch={false}>
            <a>
              <span className={styles["top-item-text"]}>
                {translate(textKey)}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderTopLeft;
