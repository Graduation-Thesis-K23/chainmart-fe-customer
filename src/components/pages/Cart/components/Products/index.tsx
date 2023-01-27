import React from "react";

import styles from "./Products.module.scss";
import useTranslate from "~/hooks/useLocales";
import useCart from "~/contexts/CartContext";
import { convertPrice } from "~/helpers";
import Image from "next/image";

const Products = () => {
  const imageText = useTranslate("cart.productImage");
  const nameText = useTranslate("cart.productName");
  const unitPriceText = useTranslate("cart.productUnitPrice");
  const quantityText = useTranslate("cart.productQuantity");
  const totalText = useTranslate("cart.productTotal");
  const actionText = useTranslate("cart.productAction");

  const { cart } = useCart();

  return (
    <div className={styles["products"]}>
      <div className="container">
        <div className={styles["table_container"]}>
          <table className={styles["products_table"]}>
            <thead>
              <tr>
                <th className={styles["products_table_head"]}>ID</th>
                <th className={styles["products_table_head"]}>{imageText}</th>
                <th className={styles["products_table_head"]}>{nameText}</th>
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
                  <td className={styles["products_table_body"]}>{index + 1}</td>
                  <td className={styles["products_table_body"]}>
                    <Image
                      className={styles["products_table_body_image"]}
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.name}
                    />
                  </td>
                  <td className={styles["products_table_body"]}>{item.name}</td>
                  <td className={styles["products_table_body"]}>
                    {convertPrice(item.price)}đ
                  </td>
                  <td className={styles["products_table_body"]}>
                    {item.quantity}
                  </td>
                  <td className={styles["products_table_body"]}>
                    {convertPrice(item.price * item.quantity)}đ
                  </td>
                  <td className={styles["products_table_body"]}>X</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
