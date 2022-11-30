import React from "react";

import TextLink from "~/components/atomics/TextLink";
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
        <TextLink
          href="/nearest"
          text={translate("header.topRight.nearestStore")}
          blank
        />
      </div>
      <TopRightLanguage />
      <TopRightAuth />
    </div>
  );
};

export default TopRight;
