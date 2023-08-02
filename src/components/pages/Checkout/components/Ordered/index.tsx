import React, { memo, useEffect } from "react";
// import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./Ordered.module.scss";
import Translate from "~/components/commons/Translate";
import {
  ASYNC_STATUS,
  fetchCarts,
  setNoteCheckout,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import getS3Image from "~/helpers/get-s3-image";
import { convertPrice } from "~/helpers";
import { Col, Row, Skeleton } from "antd";

const Ordered = () => {
  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;

  const ordered = useAppSelector((state) => state.cart);
  const note = useAppSelector((state) => state.checkout.note);
  const dispatch = useAppDispatch();

  // const router = useRouter();

  const total = ordered.data.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );

  const handleTypeNoteChange = (note: string) => {
    dispatch(setNoteCheckout(note));
  };

  useEffect(() => {
    if (ordered.status === ASYNC_STATUS.IDLE) {
      dispatch(fetchCarts());
    }
  }, [dispatch, ordered.status]);

  /* if (ordered.data.length === 0) {
    router.push("/");
  } */

  return (
    <section className={styles["ordered"]}>
      <div className="container">
        {isLoading ? (
          <div
            style={{
              height: 300,
              width: 1200,
              overflow: "hidden",
            }}
          >
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
            <Skeleton.Input active size="large" block />
          </div>
        ) : (
          <div className={styles["ordered__container"]}>
            <p className={styles["ordered__title"]}>
              <Translate textKey="checkout.ordered" />
            </p>
            <div className={styles["table_container"]}>
              <table className={styles["checkout_table"]}>
                <thead>
                  <tr>
                    <th className={styles["checkout_table_head"]}>
                      <Translate textKey="cart.product" />
                    </th>
                    <th className={styles["checkout_table_head"]}>
                      <Translate textKey="cart.productUnitPrice" />
                    </th>
                    <th className={styles["checkout_table_head"]}>
                      <Translate textKey="cart.productQuantity" />
                    </th>
                    <th className={styles["checkout_table_head"]}>
                      <Translate textKey="cart.productTotal" />
                    </th>
                  </tr>
                </thead>
                <tbody className={styles["checkout_table_tbody"]}>
                  {ordered.data.map((item, index) => (
                    <tr key={index} className={styles["checkout_table_row"]}>
                      <td className={styles["checkout_table_body"]}>
                        <div className={styles["checkout_table_body_product"]}>
                          <Image
                            className={styles["checkout_table_body_image"]}
                            src={getS3Image(item.image)}
                            width={48}
                            height={48}
                            alt={item.name}
                          />
                          <p className={styles["checkout_table_body_name"]}>
                            <p
                              className={styles["checkout_table_body_name_top"]}
                            >
                              {item.name}
                            </p>
                          </p>
                        </div>
                      </td>
                      <td className={styles["checkout_table_body"]}>
                        <span className={styles["checkout_table_body_price"]}>
                          {convertPrice(item.price)}
                        </span>
                      </td>
                      <td className={styles["checkout_table_body"]}>
                        {item.quantity}
                      </td>
                      <td className={styles["checkout_table_body"]}>
                        <span className={styles["checkout_table_body_price"]}>
                          {convertPrice(item.price * item.quantity)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Row className={styles["ordered__footer"]}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["ordered__note"]}>
                  <div className={styles["ordered__note__text"]}>
                    <Translate textKey="checkout.note" />
                  </div>
                  <input
                    className={styles["ordered__note__input"]}
                    value={note}
                    onChange={(e) => handleTypeNoteChange(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["ordered__total"]}>
                  <span className={styles["ordered__total__text"]}>
                    <Translate textKey="cart.cartTotal" />
                  </span>
                  <span className={styles["ordered__total__price"]}>
                    {convertPrice(total)}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Ordered);
