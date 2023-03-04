import React, { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { LOGIN_STATE } from "../HeaderLogin";

import useTranslate from "~/hooks/useLocales";
import styles from "./HeaderRegisterForm.module.scss";

const HeaderRegisterForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const orText = useTranslate("login.or");
  const createTitleText = useTranslate("login.createTitle");
  const createDescText = useTranslate("login.createDesc");
  const createBtnText = useTranslate("login.createBtn");
  const createPasswordText = useTranslate("login.createPassword");

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
        <div className={styles["register_title"]}>{createTitleText}</div>
        <div className={styles["register_desc"]}>{createDescText}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            placeholder="Email/Phone"
            className={styles["register_input"]}
            required
          />
          <input
            {...register("password")}
            placeholder={createPasswordText}
            className={styles["register_input"]}
            required
          />
          <input
            type="submit"
            value={createBtnText}
            className={styles["register_btn"]}
          />
        </form>
        <Divider plain>{orText}</Divider>
      </div>
    </div>
  );
};

export default memo(HeaderRegisterForm);
