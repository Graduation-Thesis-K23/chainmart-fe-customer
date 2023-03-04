import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IdcardOutlined, LockOutlined } from "@ant-design/icons";

import HeaderLoginInput from "../HeaderLoginInput";

import styles from "./HeaderLoginForm.module.scss";
import useTranslate from "~/hooks/useLocales";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";
import { REGISTER_STATE, FORGOT_STATE } from "../HeaderLogin";

const HeaderLoginForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const titleText = useTranslate("login.title");
  const signInText = useTranslate("header.topRight.login");
  const orText = useTranslate("login.or");
  const forgotPasswordText = useTranslate("login.forgotPassword");
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
    <>
      <div className={styles["form"]}>
        <div className={styles["form_title"]}>{titleText}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderLoginInput
            control={control}
            name="username"
            icon={<IdcardOutlined />}
            labelKey="settings.username"
          />
          <HeaderLoginInput
            control={control}
            name="password"
            icon={<LockOutlined />}
            labelKey="settings.password"
            type="password"
          />

          <input
            type="submit"
            className={styles["login-btn"]}
            value={signInText}
          />
        </form>
        <Divider plain>{orText}</Divider>
        <button
          onClick={() => setFormCode(FORGOT_STATE)}
          className={styles["forgot_link"]}
        >
          {forgotPasswordText}
        </button>
        <div className={styles["oauth"]}>
          <Link href="/google" className={styles["oauth-btn"]} prefetch={false}>
            <Image src={googleSvg} alt="facebook-logo" width={48} height={48} />
          </Link>
          <Link
            href="/facebook"
            className={styles["oauth-btn"]}
            prefetch={false}
          >
            <Image
              src={facebookSvg}
              alt="facebook-logo"
              width={48}
              height={48}
            />
          </Link>
        </div>
        <div className={styles["register"]}>
          <span className={styles["register_label"]}>{newUserText}</span>
          <button
            onClick={() => setFormCode(REGISTER_STATE)}
            className={styles["register_link"]}
          >
            {createText}
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderLoginForm);
