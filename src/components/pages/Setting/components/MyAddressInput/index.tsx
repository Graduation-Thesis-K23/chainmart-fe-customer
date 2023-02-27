import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddressInput.module.scss";

const MyAddressInput: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  type?: HTMLInputTypeAttribute;
  control: Control<{
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    street: string;
  }>;
  name: "fullName" | "phoneNumber" | "city" | "district" | "ward" | "street";
}> = ({ labelKey, icon, type = "text", control, name }) => {
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
      render={({ field: { onChange, ref } }) => (
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
              required
            />
            <span className={styles["focus-border"]}></span>
          </div>
        </div>
      )}
    />
  );
};

export default memo(MyAddressInput);
