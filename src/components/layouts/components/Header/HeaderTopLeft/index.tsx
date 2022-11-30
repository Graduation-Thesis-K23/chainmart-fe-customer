import React from "react";

import headerTopLeft from "~/dataSources/HeaderTopLeft";
import TextLink from "~/components/atomics/TextLink";

import styles from "./TopLeft.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const HeaderTopLeft = () => {
  return (
    <div className={styles["header-top-left"]}>
      {headerTopLeft.map(({ key, href, textKey, blank }) => (
        <div key={key} className={styles["top-item"]}>
          <TextLink href={href} text={translate(textKey)} blank={blank} />
        </div>
      ))}
    </div>
  );
};

export default HeaderTopLeft;
