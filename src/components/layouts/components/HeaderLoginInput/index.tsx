import React, { HTMLInputTypeAttribute, memo } from "react";
import { Control, Controller } from "react-hook-form";

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
}> = ({ control, name, icon, labelKey, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
        maxLength: 32,
        minLength: 8,
      }}
      render={({ field: { onChange } }) => (
        <Input
          labelKey={labelKey}
          icon={icon}
          onChange={onChange}
          type={type}
          labelMarginBottom={6}
          labelFontSize={16}
        />
      )}
    />
  );
};

export default memo(HeaderLoginInput);
