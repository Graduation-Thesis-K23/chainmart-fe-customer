// libs
import React from "react";
import { Badge, Dropdown } from "antd";
// components
import { CartIcon } from "~/assets/icons";
import BottomCartList from "./BottomCartList";
import BottomCartLabel from "./BottomCartLabel";
import BottomCartButton from "./BottomCartButton";
// others
import styles from "./BottomCart.module.scss";

const items = [
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
];

const BottomCart = () => (
  <div className={styles["header-bottom-cart"]} id="cart">
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      getPopupContainer={() => document.getElementById("cart") as HTMLElement}
    >
      <Badge count={1} offset={[-2, 4]} size="small" title="">
        <CartIcon />
      </Badge>
    </Dropdown>
  </div>
);

export default BottomCart;
