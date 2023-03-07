import React, { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IdcardOutlined,
  LockOutlined,
  LeftOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { LOGIN_STATE } from "../HeaderLogin";
import HeaderRegisterInput from "../HeaderRegisterInput";

import styles from "./HeaderRegisterForm.module.scss";
import Translate from "~/components/commons/Translate";
import { signUp, SignUpPayload } from "~/apis/auth";

const HeaderRegisterForm: React.FC<{
  setFormCode: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFormCode }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpPayload> = async (payload) => {
    const response = await signUp(payload);

    if (response) {
      document.location.href = "/";
    } else {
      console.log("show error message");
    }
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
        <div className={styles["register_title"]}>
          <Translate textKey="login.createTitle" />
        </div>
        <div className={styles["register_desc"]}>
          <Translate textKey="login.createDesc" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderRegisterInput
            control={control}
            name="name"
            labelKey="settings.fullName"
            icon={<IdcardOutlined />}
          />
          <HeaderRegisterInput
            control={control}
            name="username"
            labelKey="settings.username"
            icon={<UserOutlined />}
          />
          <HeaderRegisterInput
            control={control}
            name="password"
            labelKey="login.createPassword"
            type="password"
            icon={<LockOutlined />}
          />

          <HeaderRegisterInput
            control={control}
            name="email"
            type="email"
            labelKey="settings.email"
            icon={<MailOutlined />}
          />
          <button type="submit" className={styles["register_btn"]}>
            <Translate textKey="login.createBtn" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(HeaderRegisterForm);
