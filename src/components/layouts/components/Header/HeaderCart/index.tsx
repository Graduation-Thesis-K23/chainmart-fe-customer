// libs
import React, { memo, useMemo } from "react";
import { Badge, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
// components
import CartPopup from "./CartPopup";

// others
import styles from "./HeaderCart.module.scss";
import useCart from "~/contexts/CartContext";
import cartIcon from "~/assets/icons/cart.svg";

const HeaderCart = () => {
  const { cart } = useCart();

  const count = useMemo(() => {
    return cart.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className={styles["header_cart"]} id="header-cart">
      <Badge count={count} offset={[-2, 4]} size="small" title="">
        <Popover
          content={CartPopup}
          placement="bottomRight"
          getPopupContainer={() =>
            document.getElementById("header-cart") as HTMLElement
          }
          arrowPointAtCenter={true}
        >
          <>
            <Link href="/cart">
              <a aria-label="Giỏ hàng">
                <Image src={cartIcon} width={24} height={24} alt="cart-icon" />
              </a>
            </Link>
          </>
        </Popover>
      </Badge>
    </div>
  );
};

export default memo(HeaderCart);
