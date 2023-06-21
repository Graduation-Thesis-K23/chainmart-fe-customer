import React, { memo, useMemo } from "react";
import TermsAndConditionJson from "~/dataSources/TermsAndCondition";
import { useLocales } from "~/hooks/useLocales";

import styles from "./styles.module.scss";

const TermsAndConditionScreen = () => {
  const { local } = useLocales();

  const { title, contents } = useMemo(() => {
    return TermsAndConditionJson[local as keyof typeof TermsAndConditionJson];
  }, [local]);

  return (
    <div className={styles["container"]}>
      <h1>{title}</h1>

      <div className={styles["content-list"]}>
        {contents.map((i) => (
          <div className={styles["content-item"]} key={i.key}>
            <p className={styles["content-item__title"]}>{i.title}</p>
            <p className={styles["content-item__content"]}>{i.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TermsAndConditionScreen);
