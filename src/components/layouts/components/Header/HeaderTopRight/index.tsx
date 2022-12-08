import React from "react";
import Link from "next/link";

import TopRightAuth from "./TopRightAuth";
import TopRightLanguage from "./TopRightLanguage";
import { LocationIcon } from "~/assets/icons";

import styles from "./TopRight.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const TopRight = () => {
  return (
    <div className={styles["top-right"]}>
      <div className={styles["header-top-item"]}>
        <LocationIcon />
        <Link href="/nearest-store" prefetch={false}>
          <a>
            <span className={styles["header-top-item-text"]}>
              {translate("header.topRight.nearestStore")}
            </span>
          </a>
        </Link>
      </div>
      <TopRightLanguage />
      <TopRightAuth />
    </div>
  );
};

export default TopRight;
