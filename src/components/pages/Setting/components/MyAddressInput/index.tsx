import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import classNames from "classnames";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddressInput.module.scss";

const MyAddressInput: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
}> = ({ labelKey, icon, type = "text", register }) => {
  const [active, setActive] = useState(false);

  const labelText = useTranslate(labelKey);
  const id = useId();

  const { onChange, name, ref } = register(labelKey);

  const handleInputFocus = () => {
    setActive(true);
  };

  const handleInputBlur = () => {
    setActive(false);
  };

  return (
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
          name={name}
          onChange={onChange}
          id={id}
          required
        />
        <span className={styles["focus-border"]}></span>
      </div>
    </div>
  );
};

export default memo(MyAddressInput);
