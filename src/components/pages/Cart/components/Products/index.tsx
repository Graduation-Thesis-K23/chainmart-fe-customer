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
  deleteItemCart,
  updateItemQuantity,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import Translate from "~/components/commons/Translate";
import { useRouter } from "next/router";

const Products = () => {
  const cart = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const total = useMemo(() => {
    return cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }, [cart]);

  const handleChangeQuantity = (
    id: string,
    action: "increase" | "decrease"
  ) => {
    dispatch(updateItemQuantity({ id, action }));
  };

  const handleRemove = (id: string) => {
    dispatch(deleteItemCart(id));
  };

  const handleCheckoutBtn = () => {
    router.push("/checkout");
  };

  if (cart.length === 0) {
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
                  <Translate textKey="cart.quantityText" />
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
              {cart.map((item, index) => (
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
                          {item.name} <Translate textKey="cart.product" />
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
