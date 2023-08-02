import React, { memo, useMemo, useEffect } from "react";
import { Badge, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";

import CartPopup from "./CartPopup";

import styles from "./HeaderCart.module.scss";
import cartIcon from "~/assets/icons/cart.svg";
import {
  ASYNC_STATUS,
  fetchCarts,
  useAppDispatch,
  useAppSelector,
} from "~/redux";

const HeaderCart = () => {
  const status = useAppSelector((state) => state.user.status);
  const cart = useAppSelector((state) => state.cart);

  const count = useMemo(() => {
    return cart.data.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
  }, [cart]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status !== ASYNC_STATUS.SUCCEED) {
      return;
    }
    dispatch(fetchCarts());
  }, [dispatch]);

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
            <Link href="/cart" aria-label="Giỏ hàng">
              <Image src={cartIcon} width={24} height={24} alt="cart-icon" />
            </Link>
          </>
        </Popover>
      </Badge>
    </div>
  );
};

export default memo(HeaderCart);
