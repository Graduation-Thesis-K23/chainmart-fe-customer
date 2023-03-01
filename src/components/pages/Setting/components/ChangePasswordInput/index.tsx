import React, { HTMLInputTypeAttribute, memo, useId, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import classNames from "classnames";

import useTranslate from "~/hooks/useLocales";
import passwordCheck, { ERRORS } from "~/helpers/password-check";
import styles from "./ChangePasswordInput.module.scss";

const ChangePasswordInput: React.FC<{
  labelKey: string;
  type?: HTMLInputTypeAttribute;
  control: Control<{
    currentPassword: string;
    newPassword: string;
    renewPassword: string;
  }>;
  name: "currentPassword" | "newPassword" | "renewPassword";
  handleError: {
    error: FieldError | undefined;
    setError: UseFormSetError<{
      currentPassword: string;
      newPassword: string;
      renewPassword: string;
    }>;
    clearErrors: UseFormClearErrors<{
      currentPassword: string;
      newPassword: string;
      renewPassword: string;
    }>;
  };
}> = ({ labelKey, type = "text", control, name, handleError }) => {
  const id = useId();

  const labelText = useTranslate(labelKey);
  const errMinText = useTranslate("settings.passwordErrorMinLength");
  const errMaxText = useTranslate("settings.passwordErrorMaxLength");
  const errStrongText = useTranslate("settings.passwordErrorStrong");

  const [active, setActive] = useState(false);

  const handleInputFocus = () => {
    setActive(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setActive(false);

    const errorCode = passwordCheck(e.target.value);

    console.log(errorCode);

    if (errorCode === ERRORS.PASSWORD_MIN_LENGTH) {
      handleError.setError(name, { type: "validate", message: errMinText });
    } else if (errorCode === ERRORS.PASSWORD_MAX_LENGTH) {
      handleError.setError(name, { type: "validate", message: errMaxText });
    } else if (errorCode === ERRORS.PASSWORD_REGEX) {
      handleError.setError(name, { type: "validate", message: errStrongText });
    } else {
      handleError.clearErrors(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <div className={styles["input-group"]}>
          <label className={styles["input-group_label"]} htmlFor={id}>
            {labelText}
          </label>
          <div
            className={classNames(styles["input-group_input"], {
              [styles["input-group_input--active"]]: active,
            })}
          >
            <input
              type={type}
              className={styles["input-group_input_text"]}
              onFocus={handleInputFocus}
              onBlur={(e) => handleInputBlur(e)}
              ref={ref}
              onChange={onChange}
              id={id}
              required
            />
            <span className={styles["focus-border"]}></span>
          </div>
          <div className={styles["input-group_error"]}>
            {handleError.error?.message}
          </div>
        </div>
      )}
    />
  );
};

export default memo(ChangePasswordInput);
