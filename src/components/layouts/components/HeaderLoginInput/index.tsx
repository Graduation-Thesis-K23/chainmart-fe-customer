import React, { HTMLInputTypeAttribute, memo } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

import Input from "~/components/commons/Input";

const HeaderLoginInput: React.FC<{
  control: Control<{
    username: string;
    password: string;
  }>;
  name: "username" | "password";
  icon: JSX.Element;
  labelKey: string;
  type?: HTMLInputTypeAttribute;
  rules?: RegisterOptions;
}> = ({ control, name, icon, labelKey, type = "text", rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur } }) => (
        <Input
          labelKey={labelKey}
          icon={icon}
          onChange={onChange}
          type={type}
          onBlur={onBlur}
          labelMarginBottom={2}
          labelFontSize={16}
          marginBottom={2}
        />
      )}
    />
  );
};

export default memo(HeaderLoginInput);
