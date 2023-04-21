import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import Translate from "../Translate";

const Input: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelMarginBottom?: number;
  labelFontSize?: number;
  type?: HTMLInputTypeAttribute;
  marginBottom?: number;
}> = ({
  labelKey,
  type = "text",
  icon,
  onChange,
  labelMarginBottom = 14,
  labelFontSize = 12,
  marginBottom = 10,
}) => {
  const [active, setActive] = useState(false);

  const id = useId();

  const handleInputFocus = () => {
    setActive(true);
  };

  const handleInputBlur = () => {
    setActive(false);
  };

  return (
    <div
      className={styles["input-group"]}
      style={{
        marginBottom,
      }}
    >
      <label
        style={{
          marginBottom: labelMarginBottom,
          fontSize: labelFontSize,
        }}
        className={styles["input_label"]}
        htmlFor={id}
      >
        <Translate textKey={labelKey} />
      </label>
      <div
        className={classNames(styles["input"], {
          [styles["input--active"]]: active,
        })}
      >
        <span className={styles["input_icon"]}>{icon}</span>
        <input
          type={type}
          className={styles["input_text"]}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={onChange}
          id={id}
          autoComplete="off"
        />
        <span className={styles["focus-border"]}></span>
      </div>
    </div>
  );
};

export default memo(Input);
