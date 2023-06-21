import React, { memo, useMemo } from "react";
import EInvoiceJson from "~/dataSources/EInvoice";
import { useLocales } from "~/hooks/useLocales";

import styles from "./styles.module.scss";

const EInvoice = () => {
  const { local } = useLocales();

  const { title, contents } = useMemo(() => {
    return EInvoiceJson[local as keyof typeof EInvoiceJson];
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

export default memo(EInvoice);
