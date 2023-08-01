import React, { memo, useMemo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import styles from "./Products.module.scss";
import { convertPrice } from "~/helpers";
import { INCREASE, DECREASE } from "~/constants";
import getS3Image from "~/helpers/get-s3-image";
import {
  ASYNC_STATUS,
  updateCarts,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import Translate from "~/components/commons/Translate";
import { useRouter } from "next/router";
import { ICart } from "~/shared";
import { Spin } from "antd";

const Products = () => {
  const { data: carts, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const total = useMemo(() => {
    return carts.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }, [carts]);

  const handleChangeQuantity = (
    id: string,
    action: "increase" | "decrease"
  ) => {
    const cloneCarts = JSON.parse(JSON.stringify(carts)) as ICart[];

    const index = cloneCarts.findIndex((item) => item.id === id);

    if (action === INCREASE) {
      cloneCarts[index].quantity += 1;
      if (cloneCarts[index].quantity > cloneCarts[index].maxQuantity) return;
    } else if (action === DECREASE) {
      if (cloneCarts[index].quantity === 1) return;
      cloneCarts[index].quantity -= 1;
    }

    dispatch(updateCarts(JSON.stringify(cloneCarts)));
  };

  const handleRemove = (id: string) => {
    const cloneCarts = JSON.parse(JSON.stringify(carts)) as ICart[];

    const index = cloneCarts.findIndex((item) => item.id === id);

    cloneCarts.splice(index, 1);

    console.log(cloneCarts);

    dispatch(updateCarts(JSON.stringify(cloneCarts)));
  };

  const handleCheckoutBtn = () => {
    router.push("/checkout");
  };

  if (status !== ASYNC_STATUS.SUCCEED) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
        }}
      >
        <Spin />
      </div>
    );
  }
  if (carts.length === 0) {
    return (
      <div className={styles["products--empty"]}>
        <Translate textKey="cart.empty" />
      </div>
    );
  }
  return (
    <div className={styles["products"]}>
      <div className="container">
        <div className={styles["table_container"]}>
          <table className={styles["products_table"]}>
            <thead>
              <tr>
                <th className={styles["products_table_head"]}>
                  <Translate textKey="cart.product" />
                </th>
                <th className={styles["products_table_head"]}>
                  <Translate textKey="cart.productUnitPrice" />
                </th>
                <th className={styles["products_table_head"]}>
                  <Translate textKey="cart.productQuantity" />
                </th>
                <th className={styles["products_table_head"]}>
                  <Translate textKey="cart.productTotal" />
                </th>
                <th className={styles["products_table_head"]}>
                  <Translate textKey="cart.productAction" />
                </th>
              </tr>
            </thead>
            <tbody className={styles["products_table_tbody"]}>
              {carts.map((item, index) => (
                <tr key={index} className={styles["products_table_row"]}>
                  <td className={styles["products_table_body"]}>
                    <div className={styles["products_table_body_product"]}>
                      <Image
                        className={styles["products_table_body_image"]}
                        src={getS3Image(item.image)}
                        width={80}
                        height={80}
                        alt={item.name}
                      />
                      <Link
                        href={"/" + item.slug}
                        className={styles["products_table_body_name"]}
                      >
                        <p className={styles["products_table_body_name_top"]}>
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span className={styles["products_table_body_price"]}>
                      {convertPrice(item.price)}
                    </span>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <div className={styles["quantity-control"]}>
                      <button
                        className={classNames(styles["quantity-control-sub"], {
                          [styles["quantity-control-sub--disable"]]:
                            item.quantity === 1,
                        })}
                        onClick={() => handleChangeQuantity(item.id, DECREASE)}
                      >
                        -
                      </button>
                      <span className={styles["quantity-control-value"]}>
                        {item.quantity}
                      </span>
                      <button
                        className={classNames(styles["quantity-control-add"], {
                          [styles["quantity-control-add--disable"]]:
                            item.quantity === item.maxQuantity,
                        })}
                        onClick={() => handleChangeQuantity(item.id, INCREASE)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span className={styles["products_table_body_price"]}>
                      {convertPrice(item.price * item.quantity)}
                    </span>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span
                      className={styles["products_table_body_delete"]}
                      onClick={() => handleRemove(item.id)}
                    >
                      <DeleteOutlined />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles["products_checkout"]}>
          <p className={styles["products_checkout_text"]}>
            <Translate textKey="cart.note" />
          </p>
          <div className={styles["products_checkout_info"]}>
            <span className={styles["products_checkout_total"]}>
              <Translate textKey="cart.cartTotal" />
            </span>
            <span className={styles["products_checkout_price"]}>
              {convertPrice(total)}
            </span>
            <button
              className={styles["products_checkout_button"]}
              onClick={handleCheckoutBtn}
            >
              <Translate textKey="cart.checkout" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Products);
