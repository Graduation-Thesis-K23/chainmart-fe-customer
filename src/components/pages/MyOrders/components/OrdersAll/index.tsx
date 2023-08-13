import React, { memo, Fragment } from "react";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./OrdersAll.module.scss";
import {
  fetchOrders,
  searchOrders,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import Order from "../Order";
import OrdersEmpty from "../OrdersEmpty";
import useTranslate from "~/hooks/useLocales";

const OrdersAll = () => {
  const orders = useAppSelector((state) => state.orders);
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useAppDispatch();

  const inputPlaceholder = useTranslate("purchase.searchOrderPlaceholder");

  const handlePressEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (searchText.length === 0) {
      await dispatch(fetchOrders("all"));
      return;
    }

    if (event.key === "Enter") {
      console.log("searchText", searchText);
      const result = await dispatch(searchOrders(searchText));

      if (searchOrders.fulfilled.match(result)) {
        console.log("result", result.payload);
      }

      if (searchOrders.rejected.match(result)) {
        console.log("result", result.payload);
      }
    }
  };

  return (
    <div className={styles["orders-all"]}>
      <div className={styles["orders-all__search"]}>
        <SearchOutlined className={styles["orders-all__search__icon"]} />
        <input
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
          onKeyDown={handlePressEnter}
          className={styles["orders-all__search__text"]}
          placeholder={inputPlaceholder}
        />
      </div>
      {orders.data.length > 0 ? (
        <>
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
