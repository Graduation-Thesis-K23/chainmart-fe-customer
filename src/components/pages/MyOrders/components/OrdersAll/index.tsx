import React, { memo, Fragment } from "react";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./OrdersAll.module.scss";
import { useAppSelector } from "~/redux";
import Order from "../Order";
import OrdersEmpty from "../OrdersEmpty";
import useTranslate from "~/hooks/useLocales";

const OrdersAll = () => {
  const orders = useAppSelector((state) => state.orders);

  const inputPlaceholder = useTranslate("purchase.searchOrderPlaceholder");

  return (
    <div className={styles["orders-all"]}>
      {orders.data.length > 0 ? (
        <>
          <div className={styles["orders-all__search"]}>
            <SearchOutlined className={styles["orders-all__search__icon"]} />
            <input
              className={styles["orders-all__search__text"]}
              placeholder={inputPlaceholder}
            />
          </div>
          <ul className={styles["orders-all__list"]}>
            {orders.data.map((order) => (
              <Fragment key={order.id}>
                <Order {...order} />
              </Fragment>
            ))}
          </ul>
        </>
      ) : (
        <OrdersEmpty />
      )}
    </div>
  );
};

export default memo(OrdersAll);
