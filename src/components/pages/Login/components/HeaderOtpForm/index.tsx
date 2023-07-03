import React, { useRef, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./HeaderOtpForm.module.scss";
import Translate from "~/components/commons/Translate";
import classNames from "classnames";
import confirmOtp from "~/apis/confirm-otp";
import { default as dictionary } from "~/hooks/useLocales";
import { FieldValues } from "react-hook-form";
import { FORGOT_STATE, LOGIN_STATE } from "../..";

const HeaderOtpForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
  account: string;
}> = ({ setFormCode, account }) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const messages: FieldValues = {
    "account.otpInvalid": dictionary("account.otpInvalid"),
    "account.otpExpiry": dictionary("account.otpExpiry"),
    "account.sendPasswordToAccount": dictionary(
      "account.sendPasswordToAccount"
    ),
  };

  const handleOtpSubmit = async () => {
    if (disable) return;

    if (inputElement.current !== null) {
      const otp = inputElement.current.value;
      const result = await confirmOtp(account, otp);

      if (result.statusCode === 200) {
        toast.info(messages["account.sendPasswordToAccount"] + account);
        setFormCode(LOGIN_STATE);
      } else {
        const errorMessage = messages[result?.message || "account.otpInvalid"];
        if (inputElement.current !== null) {
          inputElement.current.value = "";
        }
        setError(errorMessage);
      }
    }
  };

  const handleResendOtp = () => {
    if (inputElement.current !== null) {
      inputElement.current.value = "";
    }
  };

  const handleChangeInput = () => {
    setError("");
    if (inputElement.current !== null) {
      const value = inputElement.current.value;
      if (value.length == 6) {
        inputElement.current.blur();
        setDisable(false);
        handleOtpSubmit();
      } else {
        setDisable(true);
      }
    }
  };

  return (
    <div className={styles["otp"]}>
      <div
        onClick={() => setFormCode(FORGOT_STATE)}
        className={styles["otp_back"]}
      >
        <LeftOutlined className={styles["otp_back_icon"]} />
      </div>
      <div className={styles["otp_title"]}>
        <Translate textKey="account.enterCode" />
      </div>
      <div className={styles["otp_desc"]}>
        <p className={styles["otp_description"]}>
          <Translate textKey="account.notify" />
        </p>
        <span className={styles["otp_account"]}>{account}</span>
      </div>

      <div className={styles["otp_input"]}>
        <input
          className={styles["otp_input_element"]}
          type="tel"
          ref={inputElement}
          autoComplete="one-time-code"
          maxLength={6}
          onChange={() => handleChangeInput()}
        />
        <div className={styles["otp_input_digits"]}>
          <div className={styles["otp_input_digit"]} />
          <div className={styles["otp_input_digit"]} />
          <div className={styles["otp_input_digit"]} />
          <div className={styles["otp_input_digit"]} />
          <div className={styles["otp_input_digit"]} />
          <div className={styles["otp_input_digit"]} />
        </div>
      </div>

      <div className={styles["otp_error"]}>{error}</div>

      <div className={styles["otp_resend"]}>
        <Translate textKey="account.notReceive" />
        <button
          className={styles["otp_resend_btn"]}
          onClick={() => handleResendOtp()}
        >
          <Translate textKey="account.resend" />
        </button>
      </div>

      <div
        className={classNames(styles["otp_submit"], {
          [styles["otp_btn_disable"]]: disable,
        })}
        onClick={() => handleOtpSubmit()}
      >
        <Translate textKey="account.confirm" />
      </div>
    </div>
  );
};

export default HeaderOtpForm;
