// libs
import React from "react";
import { Badge, Popover } from "antd";
// components
import { CartIcon } from "~/assets/icons";
import BottomCartList from "./BottomCartList";
import BottomCartLabel from "./BottomCartLabel";
import BottomCartButton from "./BottomCartButton";
// others
import styles from "./BottomCart.module.scss";

const content = (
  <div>
    <div className={styles["cart-header"]}>
      <BottomCartLabel />
      <BottomCartButton />
    </div>
    <BottomCartList />
  </div>
); /*  [s
  {
    key: "1",
    label: (
      <div className={styles["cart-header"]}>
        <BottomCartLabel />
        <BottomCartButton />
      </div>
    ),
    children: BottomCartList,
    type: "group",
  },
]; */

const BottomCart = () => (
  <div className={styles["header-bottom-cart"]} id="cart">
    <Popover
      content={content}
      placement="bottomRight"
      getPopupContainer={() => document.getElementById("cart") as HTMLElement}
    >
      <Badge count={1} offset={[-10, 12]} size="small" title="">
        <div className={styles["header-bottom-cart-button"]}>
          <CartIcon />
        </div>
      </Badge>
    </Popover>
  </div>
);

export default BottomCart;
