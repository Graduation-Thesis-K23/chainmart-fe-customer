import React, { memo } from "react";
import classNames from "classnames";

import styles from "./Optional.module.scss";

const Optional: React.FC<{
  options: object;
  select: { [key: string]: string };
  setSelect: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
}> = ({ options, select, setSelect }) => {
  const optional = Object.entries(options);

  const handleSelect = (key: string, value: string) => {
    const obj = { ...select };
    obj[key] = value;

    setSelect(obj);
  };

  const checkSelected = (key: string, value: string) => {
    return select[key] === value;
  };

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
                  className={classNames(styles["options-select-option-item"], {
                    [styles["options-select-option-item--selected"]]:
                      checkSelected(title[0], String(option)),
                  })}
                  onClick={() => handleSelect(title[0], String(option))}
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

export default memo(Optional);
