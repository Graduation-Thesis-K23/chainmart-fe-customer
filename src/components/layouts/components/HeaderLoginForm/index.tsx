import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IdcardOutlined, LockOutlined } from "@ant-design/icons";

import HeaderLoginInput from "../HeaderLoginInput";
import Translate from "~/components/commons/Translate";

import styles from "./HeaderLoginForm.module.scss";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";
import { REGISTER_STATE, FORGOT_STATE } from "../HeaderLogin";

const HeaderLoginForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
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
        <div className={styles["form_title"]}>
          <Translate textKey="login.title" />
        </div>
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

          <button type="submit" className={styles["login-btn"]}>
            <Translate textKey="header.topRight.login" />
          </button>
        </form>
        <Divider plain>
          <Translate textKey="login.or" />
        </Divider>
        <button
          onClick={() => setFormCode(FORGOT_STATE)}
          className={styles["forgot_link"]}
        >
          <Translate textKey="login.forgotPassword" />
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
          <span className={styles["register_label"]}>
            <Translate textKey="login.newUser" />
          </span>
          <button
            onClick={() => setFormCode(REGISTER_STATE)}
            className={styles["register_link"]}
          >
            <Translate textKey="login.create" />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderLoginForm);
