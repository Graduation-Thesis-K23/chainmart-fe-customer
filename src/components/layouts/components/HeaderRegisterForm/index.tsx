import React, { memo, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IdcardOutlined,
  LockOutlined,
  LeftOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { LOGIN_STATE } from "../HeaderLogin";
import HeaderRegisterInput from "../HeaderRegisterInput";

import styles from "./HeaderRegisterForm.module.scss";
import Translate from "~/components/commons/Translate";
import { SignUpPayload } from "~/shared/interfaces";
import { ErrorMessage } from "@hookform/error-message";
import { signUp, useAppDispatch } from "~/redux";
import { default as dictionary } from "~/hooks/useLocales";

const HeaderRegisterForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const dispatch = useAppDispatch();

  const emailExistedText = dictionary("email.existed");
  const usernameExistedText = dictionary("username.existed");

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpPayload> = async (account) => {
    const response = await dispatch(signUp(account));
    if ("error" in response) {
      switch (response.error.message) {
        case "username.existed":
          setError(
            "username",
            {
              type: "manual",
              message: usernameExistedText,
            },
            { shouldFocus: true }
          );
          break;
        case "email.existed":
          setError(
            "email",
            {
              type: "manual",
              message: emailExistedText,
            },
            { shouldFocus: true }
          );
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={styles["register"]}>
      <div
        className={styles["register_back"]}
        onClick={() => setFormCode(LOGIN_STATE)}
      >
        <LeftOutlined className={styles["register_back_icon"]} />
      </div>
      <div>
        <div className={styles["register_title"]}>
          <Translate textKey="login.createTitle" />
        </div>
        <div className={styles["register_desc"]}>
          <Translate textKey="login.createDesc" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderRegisterInput
            control={control}
            rules={{
              required: dictionary("fullName.notEmpty"),
              pattern: {
                value: /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}\s?$/g,
                message: dictionary("fullName.inValid"),
              },
              maxLength: {
                value: 52,
                message: dictionary("fullName.maxLength"),
              },
            }}
            name="name"
            labelKey="settings.fullName"
            icon={<IdcardOutlined />}
          />
          <ErrorMessage errors={errors} name="name" />
          <HeaderRegisterInput
            control={control}
            rules={{
              required: dictionary("username.notEmpty"),
              minLength: {
                message: dictionary("username.minLength"),
                value: 8,
              },
              maxLength: {
                message: dictionary("username.maxLength"),
                value: 32,
              },
              pattern: {
                value: /^([a-z])([a-z0-9_])+$/gu,
                message: dictionary("username.inValid"),
              },
            }}
            name="username"
            labelKey="settings.username"
            icon={<UserOutlined />}
          />
          <ErrorMessage errors={errors} name="username" />
          <HeaderRegisterInput
            control={control}
            name="password"
            rules={{
              required: dictionary("password.empty"),
              minLength: {
                message: dictionary("password.minLength"),
                value: 8,
              },
              maxLength: {
                message: dictionary("password.maxLength"),
                value: 32,
              },
              pattern: {
                value:
                  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
                message: dictionary("password.notStrong"),
              },
            }}
            labelKey="login.createPassword"
            type="password"
            icon={<LockOutlined />}
          />
          <ErrorMessage errors={errors} name="password" />
          <HeaderRegisterInput
            control={control}
            rules={{
              required: dictionary("email.empty"),
              pattern: {
                value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: dictionary("email.inValid"),
              },
            }}
            name="email"
            labelKey="settings.email"
            icon={<MailOutlined />}
          />
          <ErrorMessage errors={errors} name="email" />
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={styles["register_btn"]}
          >
            <Translate textKey="login.createBtn" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(HeaderRegisterForm);
