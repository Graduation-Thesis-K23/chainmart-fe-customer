import React, { HTMLInputTypeAttribute, memo } from "react";
import { Control, Controller } from "react-hook-form";

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
}> = ({ control, name, labelKey, icon, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Input
          labelKey={labelKey}
          icon={icon}
          onChange={onChange}
          type={type}
          labelMarginBottom={0}
          labelFontSize={16}
        />
      )}
    />
  );
};

export default memo(HeaderRegisterInput);
