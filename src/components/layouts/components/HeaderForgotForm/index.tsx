import React, { memo } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { LeftOutlined } from "@ant-design/icons";

import styles from "./HeaderForgotForm.module.scss";
import { LOGIN_STATE } from "../HeaderLogin";
import Translate from "~/components/commons/Translate";
import { default as dictionary } from "~/hooks/useLocales";
import resetPassword from "~/apis/reset-password";

interface Account {
  account: string;
}

const HeaderForgotForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFormCode, setAccount }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    defaultValues: {
      account: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const messages: FieldValues = {
    "account.accountNotExist": dictionary("account.accountNotExist"),
    "account.phoneNotExist": dictionary("account.accountNotExist"),
    "account.emailNotExist": dictionary("account.accountNotExist"),
  };

  const onSubmit: SubmitHandler<Account> = async ({ account }) => {
    const result = await resetPassword(account);

    if (result.statusCode === 200) {
      setFormCode(4);
      setAccount(account);
    } else {
      const message = messages[result?.message || "account.accountNotExist"];

      setError("account", {
        type: "error",
        message,
      });
    }
  };

  return (
    <div className={styles["forget"]}>
      <div
        onClick={() => setFormCode(LOGIN_STATE)}
        className={styles["forget_back"]}
      >
        <LeftOutlined className={styles["forget_back_icon"]} />
      </div>
      <div>
        <div className={styles["forget_title"]}>
          <Translate textKey="login.forgotTitle" />
        </div>
        <div className={styles["forget_desc"]}>
          <Translate textKey="login.forgotDesc" />
        </div>
        <form>
          <Controller
            name="account"
            control={control}
            rules={{
              required: dictionary("account.notEmpty"),
              pattern: {
                value: /^(?:\d{10}|\w+@\w+\.\w{2,3})$/gu,
                message: dictionary("account.inValid"),
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <input
                placeholder="Email/Phone"
                className={styles["forget_input"]}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </form>
        <ErrorMessage errors={errors} name="account" />
        <button
          disabled={isSubmitting || !isValid}
          className={styles["forget_btn"]}
          onClick={handleSubmit(onSubmit)}
        >
          <Translate textKey="login.forgotSend" />
        </button>
      </div>
    </div>
  );
};

export default memo(HeaderForgotForm);
