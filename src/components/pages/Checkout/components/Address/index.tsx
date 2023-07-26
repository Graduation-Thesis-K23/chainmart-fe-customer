import React, { useEffect, useMemo, useState } from "react";

import styles from "./Address.module.scss";
import Translate from "~/components/commons/Translate";
import {
  ASYNC_STATUS,
  Address,
  getAllAddress,
  setAddress,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { Spin } from "antd";
import AddressList from "../AddressList";
import { isEmptyObject } from "~/utils/is-empty-object";

const Address = () => {
  const { data, status } = useAppSelector((state) => state.setting);
  const { address } = data;
  const checkoutData = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();

  const [changeAddress, setChangeAddress] = useState<boolean>(false);

  const selectedAddressRender: Address = useMemo(() => {
    if (checkoutData.address_id !== "") {
      if (address.length === 0) {
        return {} as Address;
      } else {
        const temp = address.find(
          (item) => item.id === checkoutData.address_id
        );
        if (temp) {
          dispatch(setAddress(temp.id));
          return temp;
        }

        dispatch(setAddress(address[0].id));
        return address[0];
      }
    } else {
      if (address.length === 0) {
        return {} as Address;
      } else {
        dispatch(setAddress(address[0].id));
        return address[0];
      }
    }
  }, [address, checkoutData.address_id, dispatch]);

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
                <AddressList setChangeAddress={setChangeAddress} />
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
