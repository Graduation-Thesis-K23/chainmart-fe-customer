import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IdcardOutlined, LockOutlined } from "@ant-design/icons";

import LoginInput from "../LoginInput";

import styles from "./LoginForm.module.scss";
import useTranslate from "~/hooks/useLocales";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";

const LoginForm = () => {
  const titleText = useTranslate("login.title");
  const signInText = useTranslate("header.topRight.login");
  const orText = useTranslate("login.or");
  const forgotPasswordText = useTranslate("login.forgotPassword");
  const googleText = useTranslate("login.google");
  const facebookText = useTranslate("login.facebook");
  const newUserText = useTranslate("login.newUser");
  const createText = useTranslate("login.create");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["form_title"]}>{titleText}</div>
      <LoginInput
        control={control}
        name="username"
        icon={<IdcardOutlined />}
        labelKey="settings.username"
      />
      <LoginInput
        control={control}
        name="password"
        icon={<LockOutlined />}
        labelKey="settings.password"
        type="password"
      />
      <button className={styles["login-btn"]}>{signInText}</button>
      <Divider plain>{orText}</Divider>
      <Link href="/forgot" className={styles["forgot_link"]} prefetch={false}>
        {forgotPasswordText}
      </Link>
      <Link href="/google" className={styles["oauth-btn"]} prefetch={false}>
        <Image src={googleSvg} alt="facebook-logo" width={20} height={20} />
        <span className={styles["oauth-btn_text"]}>{googleText}</span>
      </Link>
      <Link href="/facebook" className={styles["oauth-btn"]} prefetch={false}>
        <Image src={facebookSvg} alt="facebook-logo" width={20} height={20} />
        <span className={styles["oauth-btn_text"]}>{facebookText}</span>
      </Link>
      <div className={styles["register"]}>
        <span className={styles["register_label"]}>{newUserText}</span>
        <Link
          className={styles["register_link"]}
          href="/register"
          prefetch={false}
        >
          {createText}
        </Link>
      </div>
    </form>
  );
};

export default memo(LoginForm);
