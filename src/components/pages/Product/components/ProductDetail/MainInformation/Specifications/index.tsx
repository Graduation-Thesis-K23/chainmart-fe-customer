import React, { memo } from "react";

import styles from "./Specifications.module.scss";

interface Specification {
  id: string;
  key: string;
  value: string;
}

const Specifications: React.FC<{
  specifications: Array<Specification>;
}> = ({ specifications }) => {
  return (
    <ul className={styles["specifications-list"]}>
      {specifications.map((item) => (
        <li key={item.id} className={styles["specifications-list-item"]}>
          <span className={styles["specifications-list-item-key"]}>
            {item.key}
          </span>
          <span className={styles["specifications-list-item-value"]}>
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
};
export default memo(Specifications);
