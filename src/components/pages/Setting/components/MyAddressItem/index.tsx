import React, { memo } from "react";
import useTranslate from "~/hooks/useLocales";
import { Address } from "../../interfaces";

import styles from "./MyAddressItem.module.scss";

const MyAddressItem: React.FC<Address> = ({
  address,
  name,
  df,
  street,
  phone,
}) => {
  const updateText = useTranslate("settings.updateButton");
  const defaultText = useTranslate("settings.default");

  return (
    <div className={styles["address"]}>
      <div className={styles["address-left"]}>
        <div className={styles["name-phone"]}>
          <div className={styles["name"]}>{name}</div>
          <span className={styles["divider"]} />
          <div className={styles["phone"]}>{phone}</div>
        </div>
        <div className={styles["ad"]}>{address}</div>
        <div className={styles["street"]}>{street}</div>
        {df ? <div className={styles["df"]}>{defaultText}</div> : <></>}
      </div>
      <div className={styles["address-right"]}>
        <button className={styles["update-btn"]}>{updateText}</button>
      </div>
    </div>
  );
};

export default memo(MyAddressItem);
