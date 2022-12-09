import React from "react";

import styles from "./Optional.module.scss";

const Optional: React.FC<{
  options: object;
}> = ({ options }) => {
  const optional = Object.entries(options);

  return (
    <>
      {optional.map((title, index) => (
        <div key={index} className={styles["options"]}>
          <div className={styles["options-title"]}>
            <span>{String(title[0])}</span>
          </div>
          <div className={styles["options-select"]}>
            <div className={styles["options-select-option-list"]}>
              {Array.from(title[1]).map((option, index) => (
                <div
                  key={index}
                  className={styles["options-select-option-item"]}
                >
                  <span>{String(option)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Optional;
