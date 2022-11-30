// libs
import React from "react";
// components
import { Button } from "antd";
// hooks
import useLanguage from "~/hooks/useTranslate";
// others
import styles from "./BottomCartButton.module.scss";

const BottomCartButton = () => {
  const viewCart = useLanguage("cart.viewCart");

  return (
    <Button href="/cart" className={styles["cart-header__btn"]}>
      {viewCart}
    </Button>
  );
};

export default BottomCartButton;
