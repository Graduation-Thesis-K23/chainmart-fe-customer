import React, { FC, memo } from "react";
import useTranslate from "~/hooks/useLocales";

import styles from "./MyAddressItem.module.scss";
import { Address } from "~/redux";

const MyAddressItem: FC<Address> = ({
  street,
  name,
  city,
  ward,
  district,
  phone,
}) => {
  const updateText = useTranslate("settings.updateButton");

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
        <button className={styles["update-btn"]}>{updateText}</button>
      </div>
    </div>
  );
};

export default memo(MyAddressItem);
