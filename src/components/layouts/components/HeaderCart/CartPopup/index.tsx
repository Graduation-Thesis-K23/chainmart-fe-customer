import React from "react";
import { Button } from "antd";
import Link from "next/link";
import Image from "next/image";

import styles from "./CartPopup.module.scss";
import useTranslate from "~/hooks/useTranslate";
import useCart from "~/contexts/CartContext";
import { convertPrice } from "~/helpers";

const CartPopup = () => {
  const { cart } = useCart();

  const addedRecentlyText = useTranslate("cart.recentlyAdded");
  const viewCartText = useTranslate("cart.viewCart");

  return (
    <div>
      <div className={styles["cart-header"]}>
        <span>{addedRecentlyText}</span>
        <Button href="/cart" className={styles["cart-header__btn"]}>
          {viewCartText}
        </Button>
      </div>
      <>
        {cart.map((product) => (
          <div key={product.id} className={styles["cart-item-wrapper"]}>
            <Link href={`/${product.slug}`} prefetch={false}>
              <a>
                <div className={styles["cart-item-image"]}>
                  <Image
                    src={product.image}
                    width={40}
                    height={40}
                    objectFit={"cover"}
                    layout={"fixed"}
                    alt="item"
                  />
                </div>
                <div className={styles["cart-item-name"]}>
                  <span>{product.name}</span>
                </div>
                <div className={styles["cart-item-price"]}>
                  <span>{convertPrice(product.price)}đ</span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </>
    </div>
  );
};

export default CartPopup;
