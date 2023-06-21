import React, { memo, useMemo } from "react";
import CareersJson from "~/dataSources/Careers";
import { useLocales } from "~/hooks/useLocales";

import styles from "./styles.module.scss";

const CareersScreen = () => {
  const { local } = useLocales();

  const { title, contents } = useMemo(() => {
    return CareersJson[local as keyof typeof CareersJson];
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

export default memo(CareersScreen);
