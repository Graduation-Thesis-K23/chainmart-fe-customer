import React, { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { IdcardOutlined, LockOutlined } from "@ant-design/icons";

import HeaderLoginInput from "../HeaderLoginInput";
import Translate from "~/components/commons/Translate";

import styles from "./HeaderLoginForm.module.scss";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";
import { REGISTER_STATE, FORGOT_STATE } from "../HeaderLogin";
import { signIn, useAppDispatch, useAppSelector } from "~/redux";
import { SignInPayload } from "~/shared/interfaces";

const HeaderLoginForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (account) => {
    const response = await dispatch(signIn(account));

    if ("error" in response) {
      setShowError(true);
    }
  };

  const handleFormChange = () => {
    if (!showError) {
      return;
    }
    setShowError(false);
  };

  return (
    <>
      <div className={styles["form"]}>
        <div className={styles["form_title"]}>
          <Translate textKey="login.title" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
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
          {showError && <p>{message}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={styles["login-btn"]}
          >
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
          <Link
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
            className={styles["oauth-btn"]}
            prefetch={false}
          >
            <Image src={googleSvg} alt="facebook-logo" width={48} height={48} />
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/facebook`}
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