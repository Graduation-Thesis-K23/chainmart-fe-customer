import React, { FC, memo } from "react";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddressItem.module.scss";
import { Address, deleteAddress, useAppDispatch } from "~/redux";
import { Popconfirm } from "antd";

const MyAddressItem: FC<Address> = ({
  street,
  name,
  city,
  ward,
  district,
  phone,
  id = "",
}) => {
  const deleteText = useTranslate("settings.deleteButton");

  const dispatch = useAppDispatch();

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(id));
  };

  return (
    <div className={styles["address"]}>
      <div className={styles["address-left"]}>
        <div className={styles["name-phone"]}>
          <div className={styles["name"]}>{name}</div>
          <span className={styles["divider"]} />
          <div className={styles["phone"]}>{phone}</div>
        </div>
        <div className={styles["ad"]}>
          {ward + ", " + city + ", " + district}
        </div>
        <div className={styles["street"]}>{street}</div>
      </div>
      <div className={styles["address-right"]}>
        <Popconfirm
          title="Delete the address?"
          onConfirm={handleDeleteAddress}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <button className={styles["delete-btn"]}> {deleteText}</button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default memo(MyAddressItem);
