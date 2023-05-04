import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import classNames from "classnames";

import useTranslate from "~/hooks/useLocales";

import styles from "./ChangePasswordInput.module.scss";

const ChangePasswordInput: React.FC<{
  labelKey: string;
  type?: HTMLInputTypeAttribute;
  control: Control<{
    currentPassword: string;
    newPassword: string;
    renewPassword: string;
  }>;
  name: "currentPassword" | "newPassword" | "renewPassword";

  rules?: RegisterOptions;
}> = ({ labelKey, type = "text", control, name, rules }) => {
  const id = useId();

  const labelText = useTranslate(labelKey);

  const [active, setActive] = useState(false);

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
      rules={rules}
      render={({ field: { onChange, ref, onBlur } }) => (
        <div className={styles["input-group"]}>
          <label className={styles["input-group_label"]} htmlFor={id}>
            {labelText}
          </label>
          <div
            className={classNames(styles["input-group_input"], {
              [styles["input-group_input--active"]]: active,
            })}
          >
            <input
              type={type}
              className={styles["input-group_input_text"]}
              onFocus={handleInputFocus}
              onBlur={() => {
                handleInputBlur();
                onBlur();
              }}
              ref={ref}
              onChange={onChange}
              id={id}
            />
            <span className={styles["focus-border"]}></span>
          </div>
        </div>
      )}
    />
  );
};

export default memo(ChangePasswordInput);
