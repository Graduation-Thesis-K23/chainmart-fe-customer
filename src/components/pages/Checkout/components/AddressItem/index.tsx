import React, { FC, memo } from "react";

import styles from "./AddressItem.module.scss";
import { Address, setAddress, useAppDispatch, useAppSelector } from "~/redux";
import Translate from "~/components/commons/Translate";

const AddressItem: FC<Address> = ({
  street,
  name,
  city,
  ward,
  district,
  phone,
  id,
}) => {
  const dispatch = useAppDispatch();
  const checkoutAddress = useAppSelector((state) => state.checkout.address);
  const handleSelect = () => {
    dispatch(setAddress(id));
  };

  const active = checkoutAddress !== id;

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
