import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import LoginInput from "../LoginInput";

import styles from "./LoginForm.module.scss";
import useTranslate from "~/hooks/useLocales";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";

const LoginForm = () => {
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
      <div className={styles["form_title"]}>Welcome Back</div>
      <LoginInput control={control} name="username" />
      <LoginInput control={control} name="password" />
      <button className={styles["login-btn"]}>Sign In</button>
      <Divider plain>Or</Divider>
      <Link href="/forgot" className={styles["forgot_link"]}>
        Forgot password?
      </Link>
      <Link href="/google" className={styles["oauth-btn"]}>
        <Image src={googleSvg} alt="facebook-logo" width={20} height={20} />
        <span className={styles["oauth-btn_text"]}>Sign in with Google</span>
      </Link>
      <Link href="/facebook" className={styles["oauth-btn"]}>
        <Image src={facebookSvg} alt="facebook-logo" width={20} height={20} />
        <span className={styles["oauth-btn_text"]}>Sign in with Facebook</span>
      </Link>
      <div className={styles["register"]}>
        <span className={styles["register_label"]}>New user?</span>
        <Link className={styles["register_link"]} href="/register">
          Create account
        </Link>
      </div>
    </form>
  );
};

export default memo(LoginForm);
