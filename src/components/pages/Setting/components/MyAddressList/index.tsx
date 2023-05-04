import React, { memo, useEffect } from "react";

import MyAddressItem from "../MyAddressItem";
import { getAllAddress, useAppDispatch, useAppSelector } from "~/redux";
import styles from "./MyAddressList.module.scss";

const MyAddressList = () => {
  const { data } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  return (
    <div className={styles["address-list"]}>
      {data.address.map(({ name, phone, street, city, district, ward, id }) => (
        <MyAddressItem
          id={id}
          key={id}
          city={city}
          district={district}
          ward={ward}
          name={name}
          phone={phone}
          street={street}
        />
      ))}
    </div>
  );
};

export default memo(MyAddressList);
