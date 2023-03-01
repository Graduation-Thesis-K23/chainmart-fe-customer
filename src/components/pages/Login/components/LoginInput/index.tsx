import React, { memo } from "react";
import { Control, Controller } from "react-hook-form";

import styles from "./LoginInput.module.scss";

const LoginInput: React.FC<{
  control: Control<{
    username: string;
    password: string;
  }>;
  name: "username" | "password";
}> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          style={{
            display: "block",
          }}
          {...field}
        />
      )}
    />
  );
};

export default memo(LoginInput);
