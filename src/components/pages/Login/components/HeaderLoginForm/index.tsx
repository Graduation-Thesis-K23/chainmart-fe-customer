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
import { signIn, useAppDispatch, useAppSelector } from "~/redux";
import { SignInPayload } from "~/shared";
import { ErrorMessage } from "@hookform/error-message";
import { default as dictionary } from "~/hooks/useLocales";
import { FORGOT_STATE, REGISTER_STATE } from "../..";

const HeaderLoginForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.user);

  const messageText = dictionary(message);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    defaultValues: {
      account: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (account) => {
    const response = await dispatch(signIn(account));

    if (signIn.fulfilled.match(response)) {
      return;
    } else {
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
            name="account"
            rules={{
              required: dictionary("account.notEmpty"),
            }}
            icon={<IdcardOutlined />}
            labelKey="settings.account"
          />
          <ErrorMessage errors={errors} name="account" />
          <HeaderLoginInput
            control={control}
            name="password"
            rules={{
              required: dictionary("password.empty"),
            }}
            icon={<LockOutlined />}
            labelKey="settings.password"
            type="password"
          />
          <ErrorMessage errors={errors} name="password" />
          {showError && <p>{messageText}</p>}
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
