import { Select } from "antd";
import React, { memo, useId } from "react";
import { Control, Controller } from "react-hook-form";
import useTranslate from "~/hooks/useLocales";
import { SelectOption } from "../../interfaces";

import styles from "./MyAddressSelect.module.scss";

const MyAddressSelect: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  control: Control<{
    name: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    street: string;
  }>;
  name: "city" | "ward" | "district";
  options: Array<SelectOption>;
  disabled?: boolean;
  setStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      timestamp: number;
    }>
  >;
}> = (props) => {
  const {
    labelKey,
    icon,
    control,
    name,
    options,
    disabled = false,
    setStep,
  } = props;

  const labelText = useTranslate(labelKey);

  const id = useId();

  const onSelect = () => {
    if (name === "city") {
      props.setStep({
        step: 1,
        timestamp: Date.now(),
      });
    } else if (name === "district") {
      setStep({
        step: 2,
        timestamp: Date.now(),
      });
    } else if (name === "ward") {
      setStep({
        step: 3,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name={name}
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
              bordered={false}
              options={options}
              id={id}
              ref={ref}
              onChange={onChange}
              disabled={disabled}
              showSearch
              onSelect={onSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      )}
    />
  );
};

export default memo(MyAddressSelect);
