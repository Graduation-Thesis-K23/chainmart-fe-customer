import React, { memo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import styles from "./HeaderForgotForm.module.scss";
import { LOGIN_STATE } from "../HeaderLogin";
import { LeftOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import useTranslate from "~/hooks/useLocales";

const HeaderForgotForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const orText = useTranslate("login.or");
  const forgotTitleText = useTranslate("login.forgotTitle");
  const forgotDescText = useTranslate("login.forgotDesc");
  const forgotSendText = useTranslate("login.forgotSend");

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
        <div className={styles["forget_title"]}>{forgotTitleText}</div>
        <div className={styles["forget_desc"]}>{forgotDescText}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            placeholder="Email/Phone"
            className={styles["forget_input"]}
            required
          />
          <input
            type="submit"
            value={forgotSendText}
            className={styles["forget_btn"]}
          />
        </form>
        <Divider plain>{orText}</Divider>
      </div>
    </div>
  );
};

export default memo(HeaderForgotForm);
