import React, { memo, useState } from "react";
import { Divider, Col, Row, Skeleton } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import classNames from "classnames";

import Images from "./Images";
import Parameter from "./Parameter";
import Quantity from "./Quantity";
import Specifications, { Specification } from "./Specifications";
import Description from "./Description";

import styles from "./MainInformation.module.scss";
import { ICart } from "~/shared";
import {
  ASYNC_STATUS,
  updateCarts,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import Translate from "~/components/commons/Translate";

const processAddToCart = (carts: ICart[], itemCart: ICart) => {
  const newCarts = [
    ...(JSON.parse(JSON.stringify(carts)) as ICart[]),
    itemCart,
  ];

  const result: ICart[] = newCarts.reduce((acc, cur) => {
    const found = acc.find((item) => item.id === cur.id);

    if (found) {
      found.quantity += cur.quantity;
    } else {
      acc.push(cur);
    }

    return acc;
  }, [] as ICart[]);

  console.log(result);

  return JSON.stringify(result);
};

const MainInformation = () => {
  const { status: loading } = useAppSelector((state) => state.user);
  const isLoading =
    loading === ASYNC_STATUS.LOADING || loading === ASYNC_STATUS.IDLE;
  /* {
     isLoading ? <></> : <></>;
   } */
  const { data } = useAppSelector((state) => state.product);
  const { data: carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setAddCartSuccess] = useState(false);

  const handleAddToCart = () => {
    if (user.status !== ASYNC_STATUS.SUCCEED) {
      router.push("/login");
      return;
    }

    const itemCart: ICart = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: data.images[0],
      maxQuantity: 5,
      quantity,
    };

    const newCarts = processAddToCart(carts, itemCart);

    dispatch(updateCarts(newCarts));

    setAddCartSuccess(true);

    setTimeout(() => {
      setAddCartSuccess(false);
    }, 1000);
  };

  const handleBuyNow = async () => {
    if (user.status !== ASYNC_STATUS.SUCCEED) {
      router.push("/login");
      return;
    }

    const itemCart: ICart = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: data.images[0],
      maxQuantity: 5,
      quantity,
    };

    const newCarts = processAddToCart(carts, itemCart);

    await dispatch(updateCarts(newCarts));

    // redirect to cart page
    router.push("/cart");
  };

  console.log("render MainInformation", data);

  return (
    <>
      <div className={styles["main_information"]}>
        <div className="container">
          <Row className={styles["main_information_top"]} gutter={[24, 12]}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <Images images={data.images} />
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className={styles["main_information-right"]}>
                <Parameter
                  name={data.name}
                  sold={data.sold}
                  price={data.price}
                  sale={data.sale}
                />
                <Divider />

                {isLoading ? (
                  <div
                    style={{
                      marginTop: 20,
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        width: 260,
                      }}
                    >
                      <Skeleton.Input active block style={{ height: 44 }} />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        marginLeft: 20,
                        width: 260,
                      }}
                    >
                      <Skeleton.Input active block style={{ height: 44 }} />
                    </div>
                  </div>
                ) : (
                  <>
                    {data.show &&
                    data.availableQuantity &&
                    data.availableQuantity > 0 ? (
                      <>
                        <Quantity
                          maxQuantity={5}
                          quantity={quantity}
                          setQuantity={setQuantity}
                        />
                        <div
                          className={styles["main_information-right-checkout"]}
                        >
                          <button
                            className={
                              styles["main_information-right-checkout-buy"]
                            }
                            onClick={handleBuyNow}
                          >
                            <Translate textKey="product.buyNow" />
                          </button>
                          <button
                            className={
                              styles["main_information-right-checkout-cart"]
                            }
                            onClick={handleAddToCart}
                          >
                            <Translate textKey="product.addToCart" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className={styles["main_information-out-of-stock"]}>
                        <Translate textKey="product.outOfStock" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
          {isLoading ? (
            <div className={styles["description-inner"]}>
              <div className={styles["description-title"]}>
                <Skeleton.Input active />
              </div>
              <Skeleton active />
              <div className={styles["description-title"]}>
                <Skeleton.Input active />
              </div>
              <Skeleton active />
            </div>
          ) : (
            <div className={styles["description-inner"]}>
              <div className={styles["description-title"]}>
                <Translate textKey="product.specifications" />
              </div>
              <Specifications
                specifications={
                  data?.specifications as unknown as Specification[]
                }
              />
              <div className={styles["description-title"]}>
                <Translate textKey="product.description" />
              </div>
              <Description description={data.description} />
            </div>
          )}
        </div>
      </div>

      <div
        className={classNames(styles["cart_modal"], {
          [styles["show"]]: cartSuccess,
        })}
      >
        <div className={styles["cart_modal_content"]}>
          <CheckCircleOutlined className={styles["cart_modal_content_icon"]} />
          <p className={styles["cart_modal_content_text"]}>
            <Translate textKey="product.addToCartSuccess" />
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(MainInformation);
