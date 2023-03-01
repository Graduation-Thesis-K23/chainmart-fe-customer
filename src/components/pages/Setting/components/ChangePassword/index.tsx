import React, { memo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useTranslate from "~/hooks/useLocales";
import ChangePasswordInput from "../ChangePasswordInput";

import styles from "./ChangePassword.module.scss";

const ChangePassword: React.FC<{
  id: string;
}> = ({ id }) => {
  const passwordText = useTranslate("settings.changePassword");
  const passwordNotifyText = useTranslate("settings.notifyPassword");
  const saveText = useTranslate("settings.save");
  const showPasswordText = useTranslate("settings.showPassword");

  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      renewPassword: "",
    },
  });

  const onShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(e.target.checked);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <div id={id} className={styles["password"]}>
      <div className={styles["password-header"]}>{passwordText}</div>
      <div className={styles["password-body"]}>
        <div className={styles["password-notify"]}>{passwordNotifyText}</div>
        <form
          className={styles["password-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ChangePasswordInput
            labelKey="settings.currentPassword"
            control={control}
            name="currentPassword"
            type={show ? "text" : "password"}
            handleError={{
              error: errors.currentPassword,
              setError,
              clearErrors,
            }}
          />
          <ChangePasswordInput
            labelKey="settings.newPassword"
            control={control}
            name="newPassword"
            type={show ? "text" : "password"}
            handleError={{
              error: errors.newPassword,
              setError,
              clearErrors,
            }}
          />
          <ChangePasswordInput
            labelKey="settings.renewPassword"
            control={control}
            name="renewPassword"
            type={show ? "text" : "password"}
            handleError={{
              error: errors.renewPassword,
              setError,
              clearErrors,
            }}
          />
          <div className={styles["password-show"]}>
            <input
              className={styles["password-show_input"]}
              type="checkbox"
              onChange={(e) => onShowPassword(e)}
              id="showPassword"
            />
            <label
              htmlFor="showPassword"
              className={styles["password-show_label"]}
            >
              {showPasswordText}
            </label>
          </div>
          <input
            className={styles["password-submit"]}
            type="submit"
            value={saveText}
          />
        </form>
      </div>
    </div>
  );
};

export default memo(ChangePassword);
