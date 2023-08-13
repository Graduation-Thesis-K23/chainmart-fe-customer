import React, { FC } from "react";
import Image from "next/image";

import styles from "./BotMessage.module.scss";
import { MessageOrder, MessageProduct, MessageText } from "~/redux";
import Link from "next/link";
import getS3Image from "~/helpers/get-s3-image";
import { convertPrice, discount } from "~/helpers";
import Translate from "~/components/commons/Translate";
import { Divider } from "antd";

const BotMessage: FC<{
  message: unknown;
}> = ({ message }) => {
  const { type } = message as { type: string };

  if (type === "text") {
    const { text } = message as MessageText;

    return (
      <div className={styles["chatbot"]}>
        <span className={styles["chatbot__text"]}>{text}</span>
      </div>
    );
  } else if (type === "search_orders") {
    const { orders } = message as MessageOrder;
    return (
      <div>
        {orders.map((order, index) => (
          <div className={styles["chatbot__order"]} key={index}>
            <div className={styles["chatbot__order__status"]}>
              <span>Trạng thái:</span>
              <Translate textKey={order.status} />
            </div>
            <Divider
              style={{
                margin: "4px 0",
              }}
            />
            <div className={styles["chatbot__order__status"]}>
              <span>Tổng tiền</span>
              <span>{convertPrice(order.total)}</span>
            </div>
            <Divider
              style={{
                margin: "4px 0",
              }}
            />
            <div className={styles["chatbot__order__status"]}>
              <span>Địa chỉ:</span>
              <span
                style={{
                  maxWidth: "210px",
                }}
              >
                {order.address}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (type === "search_product") {
    const { products } = message as MessageProduct;
    return (
      <ul className={styles["familiar_list"]}>
        {products.map((item, index) => (
          <li key={index} className={styles["familiar_item"]}>
            <Link href={item.slug} className={styles["familiar_item_link"]}>
              <div className={styles["familiar_item_image"]}>
                <Image
                  src={getS3Image(item.image)}
                  fill
                  alt={item.slug}
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 45vw,
                    50vw"
                />
              </div>
              <div className={styles["familiar_item_body"]}>
                <span className={styles["familiar_item_body_name"]}>
                  {item.name}
                </span>
                <div className={styles["familiar_item_body_prices"]}>
                  <span className={styles["familiar_item_body_prices_one"]}>
                    {convertPrice(item.price)}
                  </span>
                  <span className={styles["familiar_item_body_prices_two"]}>
                    {convertPrice(
                      discount(item.price, item.sale ? item.sale : 0)
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>Unknown message type</div>;
  }
};

export default BotMessage;
