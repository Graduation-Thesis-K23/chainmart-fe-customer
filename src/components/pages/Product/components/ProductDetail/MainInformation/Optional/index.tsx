import React, { memo, FC } from "react";
import classNames from "classnames";

import styles from "./Optional.module.scss";

interface Option {
  id: string;
  label: string;
  values: string[];
}

const Optional: FC<{
  options: Array<Option>;
  select: { [key: string]: string };
  setSelect: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  warning: boolean;
  setWarning: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ options, select, setSelect, warning, setWarning }) => {
  const optional = options.map((i) => i.label);

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
            <span>{title}</span>
          </div>
          <div className={styles["options-select"]}>
            <div className={styles["options-select-option-list"]}>
              {options[index].values.map((option, index) => (
                <div
                  key={index}
                  className={classNames(styles["options-select-option-item"], {
                    [styles["options-select-option-item--selected"]]:
                      checkSelected(title, option),
                  })}
                  onClick={() => handleSelect(title, option)}
                >
                  <span>{option}</span>
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
