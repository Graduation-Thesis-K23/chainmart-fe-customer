import React, { memo, useEffect, useState } from "react";
import {
  PlusOutlined,
  WindowsOutlined,
  PhoneOutlined,
  ContactsOutlined,
  GlobalOutlined,
  HomeOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddress.module.scss";
import { getAddressList } from "~/apis/Settings";
import AddressItem from "../AddressItem";
import classNames from "classnames";
import MyAddressInput from "../MyAddressInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddressKey } from "../../interfaces";

const MyAddress: React.FC<{
  id: string;
}> = ({ id }) => {
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<Array<AddressKey>>([]);

  const addressText = useTranslate("settings.address");
  const addAddressText = useTranslate("settings.addNewAddress");
  const newAddressText = useTranslate("settings.newAddress");
  const saveText = useTranslate("settings.save");
  const cancelText = useTranslate("settings.cancel");
  const notifyText = useTranslate("settings.addNewAddressSuccess");

  const { register, handleSubmit } = useForm();

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setNewAddress(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(JSON.stringify(data));
    toast.success(notifyText, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
    setNewAddress(false);
  };

  useEffect(() => {
    const temp: Array<AddressKey> = getAddressList();
    setAddressList(temp);
  }, []);

  return (
    <div id={id} className={styles["address"]}>
      <div className={styles["address-top"]}>
        <div>{addressText}</div>
        <button
          className={styles["address-top_add"]}
          onClick={() => setNewAddress(true)}
        >
          <PlusOutlined
            style={{
              color: "#fff",
            }}
          />
          <span className={styles["address-top_add_text"]}>
            {addAddressText}
          </span>
        </button>
        <Modal
          title={newAddressText}
          centered
          open={newAddress}
          onCancel={() => setNewAddress(false)}
          footer={null}
          width={600}
        >
          <form
            className={styles["address-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row gutter={26}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <MyAddressInput
                  labelKey="settings.fullName"
                  icon={<ContactsOutlined />}
                  register={register}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <MyAddressInput
                  labelKey="settings.phoneNumber"
                  icon={<PhoneOutlined rotate={90} />}
                  register={register}
                />
              </Col>
            </Row>
            <Row gutter={26}>
              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <MyAddressInput
                  labelKey="settings.city"
                  icon={<GlobalOutlined />}
                  register={register}
                />
              </Col>
              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <MyAddressInput
                  labelKey="settings.district"
                  icon={<WindowsOutlined />}
                  register={register}
                />
              </Col>
              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <MyAddressInput
                  labelKey="settings.ward"
                  icon={<BuildOutlined />}
                  register={register}
                />
              </Col>
            </Row>
            <Row gutter={26}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <MyAddressInput
                  labelKey="settings.streetName"
                  icon={<HomeOutlined />}
                  register={register}
                />
              </Col>
            </Row>
            <div className={styles["address-modal_footer"]}>
              <button
                className={styles["address-modal_footer_button"]}
                onClick={(e) => handleClose(e)}
              >
                {cancelText}
              </button>
              <input
                type="submit"
                className={classNames(
                  styles["address-modal_footer_button"],
                  styles["address-modal_footer_button_save"]
                )}
                value={saveText}
              />
            </div>
          </form>
        </Modal>
      </div>
      <div className={styles["address-bot"]}>
        {addressList.map(({ key, name, phone, street, address, df }) => (
          <AddressItem
            key={key}
            address={address}
            name={name}
            phone={phone}
            street={street}
            df={df}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(MyAddress);
