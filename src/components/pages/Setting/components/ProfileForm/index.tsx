import React, { memo } from "react";
import {
  ContactsOutlined,
  CalendarOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import styles from "./ProfileForm.module.scss";
import ProfileFormInput from "../ProfileFormInput";
import ProfileFormSelect from "../ProfileFormSelect";
import useTranslate from "~/hooks/useLocales";

const ProfileForm = () => {
  const notifyText = useTranslate("settings.update");
  const saveText = useTranslate("settings.save");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      birthday: "",
      username: "",
      phoneNumber: "",
      email: "",
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(JSON.stringify(data));
    toast.success(notifyText, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  return (
    <>
      <form
        className={styles["profile-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.fullName"
              icon={<ContactsOutlined />}
              control={control}
              name="fullName"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.birthday"
              icon={<CalendarOutlined />}
              type="date"
              name="birthday"
              control={control}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.username"
              icon={<IdcardOutlined />}
              name="username"
              control={control}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.phoneNumber"
              name="phoneNumber"
              icon={<PhoneOutlined rotate={90} />}
              control={control}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.email"
              name="email"
              icon={<MailOutlined />}
              type="email"
              control={control}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormSelect
              labelKey="settings.gender"
              control={control}
              icon={<UserSwitchOutlined />}
            />
          </Col>
        </Row>
        <input
          type="submit"
          className={styles["submit-button"]}
          value={saveText}
        />
      </form>
    </>
  );
};

export default memo(ProfileForm);
