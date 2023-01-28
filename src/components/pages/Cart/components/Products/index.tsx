import React, { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import styles from "./Products.module.scss";
import useTranslate from "~/hooks/useLocales";
import useCart from "~/contexts/CartContext";
import { convertPrice, convertClassify } from "~/helpers";
import { INCREASE, DECREASE } from "~/constants";

const Products = () => {
  const productText = useTranslate("cart.product");
  const unitPriceText = useTranslate("cart.productUnitPrice");
  const quantityText = useTranslate("cart.productQuantity");
  const totalText = useTranslate("cart.productTotal");
  const actionText = useTranslate("cart.productAction");

  const { cart, setCart } = useCart();

  const handleChangeQuantity = (
    id: number,
    classify: object,
    action: string
  ) => {
    if (action === INCREASE) {
      console.log(INCREASE);
    } else if (action === DECREASE) {
      console.log(DECREASE);
    }
  };

  return (
    <div className={styles["products"]}>
      <div className="container">
        <div className={styles["table_container"]}>
          <table className={styles["products_table"]}>
            <thead>
              <tr>
                <th className={styles["products_table_head"]}>{productText}</th>
                <th className={styles["products_table_head"]}>
                  {unitPriceText}
                </th>
                <th className={styles["products_table_head"]}>
                  {quantityText}
                </th>
                <th className={styles["products_table_head"]}>{totalText}</th>
                <th className={styles["products_table_head"]}>{actionText}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className={styles["products_table_row"]}>
                  <td className={styles["products_table_body"]}>
                    <div className={styles["products_table_body_product"]}>
                      <Image
                        className={styles["products_table_body_image"]}
                        src={item.image}
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
                        <p className={styles["products_table_body_name_bot"]}>
                          {convertClassify(item.classify)}
                        </p>
                      </Link>
                    </div>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span className={styles["products_table_body_price"]}>
                      {convertPrice(item.price)}đ
                    </span>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <div className={styles["quantity-control"]}>
                      <button
                        className={classNames(styles["quantity-control-sub"], {
                          [styles["quantity-control-sub--disable"]]:
                            item.quantity === 1,
                        })}
                        onClick={() =>
                          handleChangeQuantity(item.id, item.classify, DECREASE)
                        }
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
                        onClick={() =>
                          handleChangeQuantity(item.id, item.classify, INCREASE)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span className={styles["products_table_body_price"]}>
                      {convertPrice(item.price * item.quantity)}đ
                    </span>
                  </td>
                  <td className={styles["products_table_body"]}>
                    <span className={styles["products_table_body_delete"]}>
                      <DeleteOutlined />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(Products);
