import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import classNames from "classnames";
import { RefCallBack } from "react-hook-form";

import styles from "./Input.module.scss";
import useTranslate from "~/hooks/useLocales";
import Translate from "../Translate";

const Input: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelMarginBottom?: number;
  labelFontSize?: number;
  type?: HTMLInputTypeAttribute;
  ref?: RefCallBack;
}> = ({
  labelKey,
  type = "text",
  icon,
  onChange,
  ref,
  labelMarginBottom = 14,
  labelFontSize = 12,
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
    <div className={styles["input-group"]}>
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
          ref={ref}
          required
        />
        <span className={styles["focus-border"]}></span>
      </div>
    </div>
  );
};

export default memo(Input);
