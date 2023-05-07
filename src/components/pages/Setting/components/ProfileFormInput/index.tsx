import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import { Control, RegisterOptions } from "react-hook-form/dist/types";
import classNames from "classnames";

import useTranslate from "~/hooks/useLocales";
import styles from "./ProfileFormInput.module.scss";
import { Controller } from "react-hook-form";

const ProfileFormInput: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  type?: HTMLInputTypeAttribute;
  name: "name" | "birthday" | "phone" | "gender";
  control: Control<{
    name: string;
    birthday: string;
    phone: string;
    gender: string;
  }>;
  disabled?: boolean;
  rules?: RegisterOptions;
}> = ({
  labelKey,
  icon,
  type = "text",
  control,
  disabled = false,
  name,
  rules,
}) => {
  const [active, setActive] = useState(false);

  const labelText = useTranslate(labelKey);
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
      rules={rules}
      render={({ field: { ref, onChange, value } }) => (
        <div className={styles["input-group"]}>
          <label className={styles["input-group_label"]} htmlFor={id}>
            {labelText}
          </label>
          <div
            className={classNames(styles["input-group_input"], {
              [styles["input-group_input--active"]]: active,
            })}
          >
            <span className={styles["input-group_input_icon"]}>{icon}</span>
            <input
              type={type}
              className={styles["input-group_input_text"]}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              ref={ref}
              onChange={onChange}
              id={id}
              value={value}
              disabled={disabled}
            />
            <span className={styles["focus-border"]}></span>
          </div>
        </div>
      )}
    />
  );
};

export default memo(ProfileFormInput);
