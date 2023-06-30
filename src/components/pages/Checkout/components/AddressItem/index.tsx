import React, { FC, memo } from "react";

import styles from "./AddressItem.module.scss";
import { Address } from "~/redux";
import Translate from "~/components/commons/Translate";

interface Props extends Address {
  active: boolean;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const AddressItem: FC<Props> = ({
  street,
  name,
  city,
  ward,
  district,
  phone,
  active,
  id,
  setSelectedAddress,
}) => {
  const handleSelect = () => {
    setSelectedAddress({ id, street, name, city, ward, district, phone });
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
          {street + ", " + ward + ", " + city + ", " + district}
        </div>
      </div>
      <div className={styles["address-right"]}>
        {active && (
          <button className={styles["select-btn"]} onClick={handleSelect}>
            <Translate textKey="checkout.selectBtn" />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(AddressItem);
