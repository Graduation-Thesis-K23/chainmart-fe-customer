import React, { useId } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form/dist/types";
import useTranslate from "~/hooks/useLocales";

import styles from "./ProfileFormSelect.module.scss";

const ProfileFormSelect: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  register: UseFormRegister<FieldValues>;
}> = ({ labelKey, icon, register }) => {
  const labelText = useTranslate(labelKey);
  const maleText = useTranslate("settings.male");
  const femaleText = useTranslate("settings.female");
  const customText = useTranslate("settings.custom");

  const id = useId();

  return (
    <div className={styles["select-group"]}>
      <label className={styles["select-group_label"]} htmlFor={id}>
        {labelText}
      </label>
      <div className={styles["select-group_input"]}>
        <span className={styles["select-group_input_icon"]}>{icon}</span>
        <select
          className={styles["select-group_input_text"]}
          id={id}
          {...register(labelKey)}
        >
          <option value="male">{maleText}</option>
          <option value="female">{femaleText}</option>
          <option value="custom">{customText}</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileFormSelect;
