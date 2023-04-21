import React, { HTMLInputTypeAttribute, memo } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

import Input from "~/components/commons/Input";

const HeaderRegisterInput: React.FC<{
  control: Control<{
    username: string;
    password: string;
    email: string;
    name: string;
  }>;
  name: "username" | "password" | "name" | "email";
  icon: JSX.Element;
  labelKey: string;
  type?: HTMLInputTypeAttribute;
  rules?: RegisterOptions;
}> = ({ control, name, labelKey, icon, type = "text", rules = {} }) => {
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
          onBlur={onBlur}
          type={type}
          labelMarginBottom={0}
          labelFontSize={16}
          marginBottom={2}
        />
      )}
    />
  );
};

export default memo(HeaderRegisterInput);
