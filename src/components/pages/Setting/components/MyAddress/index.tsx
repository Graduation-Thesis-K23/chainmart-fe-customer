import React, { memo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddress.module.scss";
import myAddress from "~/dataSources/MyAddress";
import AddressItem from "../AddressItem";
import classNames from "classnames";

const MyAddress: React.FC<{
  id: string;
}> = ({ id }) => {
  const [newAddress, setNewAddress] = useState<boolean>(false);

  const addressText = useTranslate("settings.address");
  const addAddressText = useTranslate("settings.addNewAddress");
  const newAddressText = useTranslate("settings.newAddress");
  const saveText = useTranslate("settings.save");
  const cancelText = useTranslate("settings.cancel");

  const handleNewAddress = (state: boolean) => {
    setNewAddress(state);
  };

  return (
    <div id={id} className={styles["address"]}>
      <div className={styles["address-top"]}>
        <div>{addressText}</div>
        <button
          className={styles["address-top_add"]}
          onClick={() => handleNewAddress(true)}
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
          onCancel={() => handleNewAddress(false)}
          footer={null}
        >
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              a
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              a
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              a
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              a
            </Col>
          </Row>
          <div className={styles["address-modal_footer"]}>
            <button className={styles["address-modal_footer_button"]}>
              {cancelText}
            </button>
            <button
              className={classNames(
                styles["address-modal_footer_button"],
                styles["address-modal_footer_button_save"]
              )}
            >
              {saveText}
            </button>
          </div>
        </Modal>
      </div>
      <div className={styles["address-bot"]}>
        {myAddress.map((address) => (
          <AddressItem key={address.key} />
        ))}
      </div>
    </div>
  );
};

export default memo(MyAddress);
