import classNames from "classnames";
import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import { Control, Controller } from "react-hook-form";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderLoginInput.module.scss";

const HeaderLoginInput: React.FC<{
  control: Control<{
    username: string;
    password: string;
  }>;
  name: "username" | "password";
  icon: JSX.Element;
  labelKey: string;
  type?: HTMLInputTypeAttribute;
}> = ({ control, name, icon, labelKey, type = "text" }) => {
  const labelText = useTranslate(labelKey);

  const [active, setActive] = useState(false);

  const id = useId();

  const handleInputFocus = () => {
    setActive(true);
  };

  const handleInputBlur = () => {
    setActive(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <div className={styles["input-group"]}>
          <label className={styles["input_label"]} htmlFor={id}>
            {labelText}
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
      )}
    />
  );
};

export default memo(HeaderLoginInput);
