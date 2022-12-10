import React from "react";

import styles from "./Specifications.module.scss";

const Specifications: React.FC<{
  specifications: { [key: string]: string };
}> = ({ specifications }) => {
  return (
    <ul className={styles["specifications-list"]}>
      {Object.keys(specifications).map((item) => (
        <li key={item} className={styles["specifications-list-item"]}>
          <span className={styles["specifications-list-item-key"]}>{item}</span>
          <span className={styles["specifications-list-item-value"]}>
            {specifications[item]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Specifications;
