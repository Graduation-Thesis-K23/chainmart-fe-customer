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
  warning: boolean;
  setWarning: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ options, select, setSelect, warning, setWarning }) => {
  const optional = Object.entries(options);

  const handleSelect = (key: string, value: string) => {
    const obj = { ...select };
    obj[key] = value;

    setWarning(false);
    setSelect(obj);
  };

  const checkSelected = (key: string, value: string) => {
    return select[key] === value;
  };

  return (
    <div
      className={classNames(styles["options_container"], {
        [styles["options_warning"]]: warning,
      })}
    >
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
    </div>
  );
};

export default memo(Optional);
