import React from "react";
import { Button, Empty } from "antd";
import Link from "next/link";
import Image from "next/image";

import styles from "./CartPopup.module.scss";
import useCart from "~/contexts/CartContext";
import { convertPrice } from "~/helpers";
import { useAppSelector } from "~/redux";
import { isEmptyObject } from "~/utils/is-empty-object";
import Translate from "~/components/commons/Translate";
import getS3Image from "~/helpers/get-s3-image";

const CartPopup = () => {
  const { data } = useAppSelector((state) => state.user);
  const { cart } = useCart();

  if (isEmptyObject(data)) {
    return (
      <div className={styles["cart_popup--empty"]}>
        <Translate textKey="cart.notLoggedIn" />
      </div>
    );
  }
  if (cart.length === 0) {
    return <Empty description={<Translate textKey="cart.empty" />} />;
  }
  return (
    <div className={styles["cart_popup"]}>
      <div className={styles["cart_popup_header"]}>
        <span className={styles["cart_popup_header_text"]}>
          <Translate textKey="cart.recentlyAdded" />
        </span>
        <Button href="/cart" className={styles["cart_popup_header_btn"]}>
          <Translate textKey="cart.viewCart" />
        </Button>
      </div>
      <ul className={styles["cart_popup_body"]}>
        {cart.map((product, index) => (
          <li key={index} className={styles["cart-item-wrapper"]}>
            <Link href={`/${product.slug}`} prefetch={false}>
              <div className={styles["cart-item-image"]}>
                <Image
                  src={getS3Image(product.image)}
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
