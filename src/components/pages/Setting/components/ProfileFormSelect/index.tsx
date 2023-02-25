import React, { useId } from "react";
import { Control, Controller } from "react-hook-form";
import { Select } from "antd";
import useTranslate from "~/hooks/useLocales";

import styles from "./ProfileFormSelect.module.scss";

const ProfileFormSelect: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  control: Control<{
    fullName: string;
    birthday: string;
    username: string;
    phoneNumber: string;
    email: string;
    gender: string;
  }>;
}> = ({ labelKey, icon, control }) => {
  const labelText = useTranslate(labelKey);
  const maleText = useTranslate("settings.male");
  const femaleText = useTranslate("settings.female");
  const customText = useTranslate("settings.custom");

  const id = useId();

  return (
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, ref } }) => (
        <div className={styles["select-group"]}>
          <label className={styles["select-group_label"]} htmlFor={id}>
            {labelText}
          </label>
          <div className={styles["select-group_input"]}>
            <span className={styles["select-group_input_icon"]}>{icon}</span>
            <Select
              style={{
                width: "100%",
              }}
              options={[
                { value: "male", label: maleText },
                { value: "female", label: femaleText },
                { value: "custom", label: customText },
              ]}
              id={id}
              ref={ref}
              onChange={onChange}
            />
            {/*  <select
              className={styles["select-group_input_text"]}
              id={id}
              {...field}
            >
              <option value="male">{maleText}</option>
              <option value="female">{femaleText}</option>
              <option value="custom">{customText}</option>
            </select> */}
          </div>
        </div>
      )}
    ></Controller>
  );
};

export default ProfileFormSelect;
