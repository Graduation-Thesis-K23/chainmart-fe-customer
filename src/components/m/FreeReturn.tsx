import React, { memo, useMemo } from "react";
import FreeReturnJson from "~/dataSources/FreeReturn";
import { useLocales } from "~/hooks/useLocales";

import styles from "./styles.module.scss";

const FreeReturnScreen = () => {
  const { local } = useLocales();

  const { title, contents } = useMemo(() => {
    return FreeReturnJson[local as keyof typeof FreeReturnJson];
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

export default memo(FreeReturnScreen);
