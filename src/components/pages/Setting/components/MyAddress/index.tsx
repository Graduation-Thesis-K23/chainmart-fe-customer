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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useTranslate from "~/hooks/useLocales";
import styles from "./MyAddress.module.scss";
import { getAddressList } from "~/apis/Settings";
import AddressItem from "../AddressItem";
import classNames from "classnames";
import MyAddressInput from "../MyAddressInput";
import { toast } from "react-toastify";
import { AddressKey } from "../../interfaces";
import MyAddressCity from "../MyAddressCity";
import MyAddressDistrict from "../MyAddressDistrict";
import MyAddressWard from "../MyAddressWard";

const MyAddress: React.FC<{
  id: string;
}> = ({ id }) => {
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<Array<AddressKey>>([]);
  /*
  0 not select so enable only city
  1 is city selected so enable district more.
  2 is district selected so enable ward more. 
  3 (can submit)
  */
  const [step, setStep] = useState({ step: 0, timestamp: Date.now() });

  const addressText = useTranslate("settings.address");
  const addAddressText = useTranslate("settings.addNewAddress");
  const newAddressText = useTranslate("settings.newAddress");
  const saveText = useTranslate("settings.save");
  const cancelText = useTranslate("settings.cancel");
  const notifyText = useTranslate("settings.addNewAddressSuccess");

  const { control, handleSubmit, getValues, setFocus, resetField } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      city: "",
      district: "",
      ward: "",
      street: "",
    },
  });

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
    // setNewAddress(false);
  };

  useEffect(() => {
    const temp: Array<AddressKey> = getAddressList();
    setAddressList(temp);
  }, []);

  useEffect(() => {
    if (step.step === 1) {
      setFocus("district");
      resetField("district");
    } else if (step.step === 2) {
      setFocus("ward");
      resetField("ward");
    } else if (step.step === 3) {
      setFocus("street");
    }
  }, [resetField, setFocus, step]);

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
          width={800}
        >
          <form
            className={styles["address-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row gutter={26}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <MyAddressInput
                  labelKey="settings.fullName"
                  icon={<ContactsOutlined />}
                  control={control}
                  name="fullName"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <MyAddressInput
                  labelKey="settings.phoneNumber"
                  icon={<PhoneOutlined rotate={90} />}
                  control={control}
                  name="phoneNumber"
                />
              </Col>
            </Row>
            <Row gutter={26}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <MyAddressCity
                  labelKey="settings.city"
                  icon={<GlobalOutlined />}
                  control={control}
                  name="city"
                  setStep={setStep}
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <MyAddressDistrict
                  labelKey="settings.district"
                  icon={<WindowsOutlined />}
                  control={control}
                  name="district"
                  disabled={!(step.step > 0)}
                  setStep={setStep}
                  city={getValues("city")}
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <MyAddressWard
                  labelKey="settings.ward"
                  icon={<BuildOutlined />}
                  control={control}
                  name="ward"
                  disabled={!(step.step > 1)}
                  setStep={setStep}
                  city={getValues("city")}
                  district={getValues("district")}
                />
              </Col>
            </Row>
            <Row gutter={26}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <MyAddressInput
                  labelKey="settings.streetName"
                  icon={<HomeOutlined />}
                  control={control}
                  name="street"
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
