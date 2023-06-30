import React, { FC, memo, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Modal, Row } from "antd";
import {
  BuildOutlined,
  ContactsOutlined,
  GlobalOutlined,
  HomeOutlined,
  PhoneOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

import {
  Address,
  createAddress,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import styles from "./AddressList.module.scss";
import AddressItem from "../AddressItem";
import Translate from "~/components/commons/Translate";
import MyAddressInput from "~/components/pages/Setting/components/MyAddressInput";
import MyAddressCity from "~/components/pages/Setting/components/MyAddressCity";
import MyAddressDistrict from "~/components/pages/Setting/components/MyAddressDistrict";
import MyAddressWard from "~/components/pages/Setting/components/MyAddressWard";

const AddressList: FC<{
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
  selectedAddress: Address;
  setChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setSelectedAddress, selectedAddress, setChangeAddress }) => {
  const { address } = useAppSelector((state) => state.setting.data);
  const [moreAddress, setMoreAddress] = useState<boolean>(false);
  /*
  0 not select so enable only city
  1 is city selected so enable district more.
  2 is district selected so enable ward more. 
  3 (can submit)
  */
  const [step, setStep] = useState({ step: 0, timestamp: Date.now() });

  const handleSave = () => {
    setChangeAddress(false);
  };

  const handleAddress = () => {
    setMoreAddress(true);
  };

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    getValues,
    setFocus,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      street: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMoreAddress(false);
  };

  const onSubmit: SubmitHandler<Address> = (data) => {
    dispatch(createAddress(data));
    setMoreAddress(false);
  };

  useEffect(() => {
    if (step.step === 1) {
      setFocus("district");
    } else if (step.step === 2) {
      setFocus("ward");
    } else if (step.step === 3) {
      setFocus("street");
    }
  }, [setFocus, step]);

  return (
    <div className={styles["address-list"]}>
      {address.map(({ name, phone, street, city, district, ward, id }) => (
        <AddressItem
          id={id}
          key={id}
          city={city}
          district={district}
          ward={ward}
          name={name}
          phone={phone}
          street={street}
          setSelectedAddress={setSelectedAddress}
          active={selectedAddress.id !== id}
        />
      ))}
      <div className={styles["btn-group"]}>
        <button className={styles["btn-group__item"]} onClick={handleAddress}>
          <Translate textKey="checkout.addAddressBtn" />
        </button>
        {address.length > 0 && (
          <button className={styles["btn-group__item"]} onClick={handleSave}>
            <Translate textKey="checkout.saveBtn" />
          </button>
        )}
      </div>
      <Modal
        centered
        open={moreAddress}
        onCancel={() => setMoreAddress(false)}
        footer={null}
        width={800}
      >
        <form className={styles["address-form"]}>
          <Row gutter={26}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <MyAddressInput
                labelKey="settings.fullName"
                icon={<ContactsOutlined />}
                control={control}
                name="name"
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <MyAddressInput
                labelKey="settings.phoneNumber"
                icon={<PhoneOutlined rotate={90} />}
                control={control}
                name="phone"
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
              <Translate textKey="settings.cancel" />
            </button>

            <Button
              className={styles["address-modal_footer_button_save"]}
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              <Translate textKey="settings.save" />
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default memo(AddressList);
