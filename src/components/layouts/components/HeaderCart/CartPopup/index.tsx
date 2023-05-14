import React from "react";
import { Button } from "antd";
import Link from "next/link";
import Image from "next/image";

import styles from "./CartPopup.module.scss";
import useTranslate from "~/hooks/useLocales";
import useCart from "~/contexts/CartContext";
import { convertPrice } from "~/helpers";

const CartPopup = () => {
  const { cart } = useCart();

  const addedRecentlyText = useTranslate("cart.recentlyAdded");
  const viewCartText = useTranslate("cart.viewCart");

  return (
    <div className={styles["cart_popup"]}>
      {cart.length === 0 ? (
        <div>Empty</div>
      ) : (
        <>
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
                      alt="item"
                    />
                  </div>
                  <div className={styles["cart-item-name"]}>
                    <span>{product.name}</span>
                  </div>
                  <div className={styles["cart-item-price"]}>
                    <span>{convertPrice(product.price)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CartPopup;
