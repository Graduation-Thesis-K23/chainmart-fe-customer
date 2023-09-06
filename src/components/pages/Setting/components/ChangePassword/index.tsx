import React, { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { default as dictionary } from "~/hooks/useLocales";
import Translate from "~/components/commons/Translate";
import ChangePasswordInput from "../ChangePasswordInput";

import styles from "./ChangePassword.module.scss";
import { changePassword, useAppDispatch } from "~/redux";
import { toast } from "react-toastify";

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  renewPassword: string;
}

const ChangePassword: React.FC<{
  id: string;
}> = ({ id }) => {
  const [show, setShow] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const formSchema = Yup.object().shape({
    newPassword: Yup.string(),
    renewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      dictionary("settings.passwordErrorSame")
    ),
  });

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      renewPassword: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(e.target.checked);
  };

  const onSubmit: SubmitHandler<ChangePassword> = async (data) => {
    if (data.currentPassword === data.newPassword) {
      setErrMessage("settings.passwordErrorSame1");
      return;
    }

    setErrMessage("");

    const result = await dispatch(changePassword(data));

    const payload = result.payload as { messageCode: string };
    console.log(payload.messageCode);

    if (payload.messageCode === "settings.changePasswordSuccess") {
      toast.success(<Translate textKey="settings.changePasswordSuccess" />, {
        autoClose: 1000,
      });
      window.location.reload();
    } else {
      toast.info(<Translate textKey={payload.messageCode} />, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div id={id} className={styles["password"]}>
      <div className={styles["password-header"]}>
        <Translate textKey="settings.changePassword" />
      </div>
      <div className={styles["password-body"]}>
        <div className={styles["password-notify"]}>
          <Translate textKey="settings.notifyPassword" />
        </div>
        <form
          className={styles["password-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ChangePasswordInput
            labelKey="settings.currentPassword"
            control={control}
            name="currentPassword"
            type={show ? "text" : "password"}
            rules={{
              required: dictionary("password.empty"),
              minLength: {
                value: 8,
                message: dictionary("settings.passwordErrorMinLength"),
              },
              maxLength: {
                value: 32,
                message: dictionary("settings.passwordErrorMaxLength"),
              },
            }}
          />
          <ErrorMessage errors={errors} name="currentPassword" />
          <ChangePasswordInput
            labelKey="settings.newPassword"
            control={control}
            name="newPassword"
            type={show ? "text" : "password"}
            rules={{
              required: dictionary("password.empty"),
              minLength: {
                value: 8,
                message: dictionary("settings.passwordErrorMinLength"),
              },
              maxLength: {
                value: 32,
                message: dictionary("settings.passwordErrorMaxLength"),
              },
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message: dictionary("settings.passwordErrorStrong"),
              },
            }}
          />
          <ErrorMessage errors={errors} name="newPassword" />
          <ChangePasswordInput
            labelKey="settings.renewPassword"
            control={control}
            name="renewPassword"
            type={show ? "text" : "password"}
            rules={{
              required: dictionary("password.empty"),
              minLength: {
                value: 8,
                message: dictionary("settings.passwordErrorMinLength"),
              },
              maxLength: {
                value: 32,
                message: dictionary("settings.passwordErrorMaxLength"),
              },
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message: dictionary("settings.passwordErrorStrong"),
              },
            }}
          />
          <ErrorMessage errors={errors} name="renewPassword" />
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
              <Translate textKey="settings.showPassword" />
            </label>
          </div>
          {<p>{dictionary(errMessage)}</p>}
          <input
            className={styles["password-submit"]}
            type="submit"
            value={dictionary("settings.save")}
          />
        </form>
      </div>
    </div>
  );
};

export default memo(ChangePassword);
