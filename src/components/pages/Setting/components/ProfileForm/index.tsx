import React, { memo, useEffect } from "react";
import {
  ContactsOutlined,
  CalendarOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import styles from "./ProfileForm.module.scss";
import ProfileFormInput from "../ProfileFormInput";
import ProfileFormSelect from "../ProfileFormSelect";
import useTranslate from "~/hooks/useLocales";
import {
  getUserInfo,
  updateUserInfo,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { default as dictionary } from "~/hooks/useLocales";
import { ErrorMessage } from "@hookform/error-message";

const ProfileForm = () => {
  const notifyText = useTranslate("settings.update");
  const saveText = useTranslate("settings.save");

  const {
    data: { info },
  } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    defaultValues: {
      name: info.name ? info.name : "",
      birthday: info.birthday ? info.birthday.slice(0, 10) : "",
      phone: info.phone ? info.phone : "",
      gender: info.gender ? info.gender : "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    for (const propName in data) {
      if (data[propName] === "" || data[propName] === undefined) {
        delete data[propName];
      }
    }

    dispatch(updateUserInfo(data));
    toast.success(notifyText, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

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
              name="name"
              rules={{
                required: dictionary("fullName.notEmpty"),
                pattern: {
                  value: /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}\s?$/g,
                  message: dictionary("fullName.inValid"),
                },
                maxLength: {
                  value: 52,
                  message: dictionary("fullName.maxLength"),
                },
              }}
            />
            <ErrorMessage errors={errors} name="name" />
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
            <ProfileFormSelect
              labelKey="settings.gender"
              control={control}
              icon={<UserSwitchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <ProfileFormInput
              labelKey="settings.phoneNumber"
              name="phone"
              icon={<PhoneOutlined rotate={90} />}
              control={control}
            />
          </Col>
        </Row>
        {/* <Row gutter={24}>
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
            <ProfileFormInput
              labelKey="settings.username"
              icon={<IdcardOutlined />}
              name="username"
              control={control}
            />
          </Col>
        </Row> */}
        <input
          type="submit"
          className={styles["submit-button"]}
          value={saveText}
          disabled={isSubmitting || !isDirty}
        />
      </form>
    </>
  );
};

export default memo(ProfileForm);
