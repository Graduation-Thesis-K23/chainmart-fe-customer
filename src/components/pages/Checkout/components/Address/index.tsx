import React, { useEffect, useState } from "react";

import styles from "./Address.module.scss";
import Translate from "~/components/commons/Translate";
import {
  ASYNC_STATUS,
  Address,
  getAllAddress,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { Spin } from "antd";
import AddressList from "../AddressList";
import { isEmptyObject } from "~/utils/is-empty-object";

const Address = () => {
  const { data, status } = useAppSelector((state) => state.setting);
  const { address } = data;
  const dispatch = useAppDispatch();

  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    {} as Address
  );

  const selectedAddressRender = !isEmptyObject(selectedAddress)
    ? selectedAddress
    : address[0];

  useEffect(() => {
    if (status === ASYNC_STATUS.IDLE) {
      dispatch(getAllAddress());
    }
  }, [address, dispatch, status]);

  return (
    <section className={styles["address"]}>
      <div className="container">
        <div className={styles["address__container"]}>
          {status === ASYNC_STATUS.SUCCEED ? (
            <>
              <p className={styles["address__title"]}>
                <Translate textKey="checkout.deliveryAddress" />
              </p>
              {!changeAddress && !isEmptyObject(selectedAddressRender) ? (
                <div className={styles["address__selected"]}>
                  <div className={styles["address__selected__item"]}>
                    <p className={styles["address__selected__item__name"]}>
                      {selectedAddressRender.name}
                    </p>
                    |
                    <p className={styles["address__selected__item__phone"]}>
                      {selectedAddressRender.phone}
                    </p>
                    <p className={styles["address__selected__item__street"]}>
                      {`
                    ${selectedAddressRender.street}, 
                    ${selectedAddressRender.ward}, 
                    ${selectedAddressRender.city} 
                    ${selectedAddressRender.district}
                  `}
                    </p>
                  </div>
                  <button
                    className={styles["address__selected__btn"]}
                    onClick={() => setChangeAddress(true)}
                  >
                    <Translate textKey="checkout.changeAddress" />
                  </button>
                </div>
              ) : (
                <AddressList
                  setSelectedAddress={setSelectedAddress}
                  selectedAddress={selectedAddressRender}
                  setChangeAddress={setChangeAddress}
                />
              )}
            </>
          ) : (
            <div className={styles["loading"]}>
              <Spin />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Address;
