import React from "react";
import { Button } from "antd";
import Link from "next/link";
import Image from "next/image";

import styles from "./CartPopup.module.scss";
import useTranslate from "~/hooks/useLocales";
import useAuth from "~/hooks/useAuth";
import useCart from "~/contexts/CartContext";
import { convertPrice } from "~/helpers";
import { Empty } from "antd";

const CartPopup = () => {
  const user = useAuth();
  const { cart } = useCart();

  const addedRecentlyText = useTranslate("cart.recentlyAdded");
  const viewCartText = useTranslate("cart.viewCart");
  const notLoggedInText = useTranslate("cart.notLoggedIn");
  const emptyText = useTranslate("cart.empty");

  if (!user) {
    return <div className={styles["cart_popup--empty"]}>{notLoggedInText}</div>;
  }
  if (cart.length === 0) {
    return <div className={styles["cart_popup--empty"]}>{emptyText}</div>;
  }
  return (
    <div className={styles["cart_popup"]}>
      <div className={styles["cart_popup_header"]}>
        <span className={styles["cart_popup_header_text"]}>
          {addedRecentlyText}
        </span>
        <Button href="/cart" className={styles["cart_popup_header_btn"]}>
          {viewCartText}
        </Button>
      </div>
      <ul className={styles["cart_popup_body"]}>
        {cart.map((product, index) => (
          <li key={index} className={styles["cart-item-wrapper"]}>
            <Link href={`/${product.slug}`} prefetch={false}>
              <div className={styles["cart-item-image"]}>
                <Image
                  src={product.image}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                  alt={product.name}
                />
              </div>
              <div className={styles["cart-item-name"]}>
                <span>{product.name}</span>
              </div>
              <div className={styles["cart-item-price"]}>
                <p>{convertPrice(product.price)}</p>
                <p>x{product.quantity}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPopup;
