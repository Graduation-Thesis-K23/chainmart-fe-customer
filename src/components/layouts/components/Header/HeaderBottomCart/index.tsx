// libs
import React, { memo, useMemo } from "react";
import { Badge, Popover } from "antd";
// components
import { CartIcon } from "~/assets/icons";
import BottomCartList from "./BottomCartList";
import BottomCartLabel from "./BottomCartLabel";
import BottomCartButton from "./BottomCartButton";
// others
import styles from "./BottomCart.module.scss";
import useCart from "~/contexts/CartContext";

const content = (
  <div>
    <div className={styles["cart-header"]}>
      <BottomCartLabel />
      <BottomCartButton />
    </div>
    <BottomCartList />
  </div>
);

const BottomCart = () => {
  const { cart } = useCart();

  const count = useMemo(() => {
    return cart.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className={styles["header-bottom-cart"]} id="cart">
      <Popover
        content={content}
        placement="bottomRight"
        getPopupContainer={() => document.getElementById("cart") as HTMLElement}
      >
        <Badge count={count} offset={[-16, 14]} size="small" title="">
          <div className={styles["header-bottom-cart-button"]}>
            <CartIcon />
          </div>
        </Badge>
      </Popover>
    </div>
  );
};

export default memo(BottomCart);
