import React, { memo } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import useTranslate from "~/hooks/useLocales";

import styles from "./ChangePassword.module.scss";

const ChangePassword: React.FC<{
  id: string;
}> = ({ id }) => {
  const passwordText = useTranslate("settings.changePassword");

  const { handleSubmit, control } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      renewPassword: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <div id={id} className={styles["password"]}>
      <div className={styles["password-header"]}>{passwordText}</div>
      <div className={styles["password-body"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} />}
          />
        </form>
      </div>
    </div>
  );
};

export default memo(ChangePassword);
