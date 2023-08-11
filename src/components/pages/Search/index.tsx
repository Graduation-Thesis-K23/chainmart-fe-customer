import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, Col, Divider, Row, Select, Skeleton } from "antd";

import categoryList from "~/shared/categories";
import styles from "./Search.module.scss";
import Translate from "~/components/commons/Translate";
import ProductList from "./ProductList";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";
import useTranslate from "~/hooks/useLocales";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

const SearchScreen = () => {
  const router = useRouter();
  const minPriceRef = React.useRef<HTMLInputElement>(null);
  const maxPriceRef = React.useRef<HTMLInputElement>(null);

  const priceText = useTranslate("search.price");

  const { status } = useAppSelector((state) => state.user);
  const isLoading =
    ASYNC_STATUS.LOADING === status || ASYNC_STATUS.IDLE === status;

  const [categories, setCategories] = useState<string>(
    (router.query.categories as string) || ""
  );

  const [order, setOrder] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  const keyword = router.query.keyword as string;

  const handleCategoryChange = (e: CheckboxChangeEvent, category: string) => {
    if (e.target.checked) {
      if (categories === "") {
        setCategories(category);
      } else {
        setCategories(categories + "," + category);
      }
    } else {
      const newCategories = categories
        .split(",")
        .filter((item) => item !== category);

      setCategories(newCategories.join(","));
    }
  };

  const handleOrderChange = (value: string) => {
    setOrder(value);
  };

  const handleApplyPrice = () => {
    const minPrice = minPriceRef.current?.value;
    const maxPrice = maxPriceRef.current?.value;

    if (minPrice && maxPrice && Number(minPrice) < Number(maxPrice)) {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    } else {
      // clear input
      if (minPriceRef.current && maxPriceRef.current) {
        minPriceRef.current.value = "";
        maxPriceRef.current.value = "";
      }
      setMinPrice("");
      setMaxPrice("");
    }
  };

  return (
    <div className={styles["search"]}>
      <Row gutter={[12, 12]}>
        <Col xs={0} sm={5} md={6} lg={4} xl={4}>
          {isLoading ? (
            <div
              style={{
                height: 500,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 27,
                  marginBottom: 12,
                  width: "70%",
                  overflow: "hidden",
                }}
              >
                <Skeleton.Input active size="large" block />
              </div>
              <div
                style={{
                  height: 20,
                  width: "50%",
                  marginBottom: 12,
                  overflow: "hidden",
                }}
              >
                <Skeleton.Input active block />
              </div>
              <div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height: 20,
                      width: "35%",
                      marginBottom: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton.Input active block />
                  </div>
                ))}
              </div>
              <Divider />
              <div
                style={{
                  height: 100,
                  marginTop: 8,
                  overflow: "hidden",
                }}
              >
                <Skeleton.Input active size="large" block />
                <Skeleton.Input active size="large" block />
                <Skeleton.Input active size="large" block />
              </div>
            </div>
          ) : (
            <div className={styles["search__filter"]}>
              <div className={styles["search__filter__title"]}>
                <Translate textKey="search.filter" />
              </div>
              <div className={styles["search__filter__item"]}>
                <div className={styles["search__filter__item__title"]}>
                  <Translate textKey="search.byCategory" />
                </div>
                <div className={styles["search__filter__item__content"]}>
                  {categoryList.map((item) => (
                    <Checkbox
                      key={item.id}
                      className={styles["search__filter__item__content__item"]}
                      defaultChecked={categories.includes(item.textKey)}
                      onChange={(e) => handleCategoryChange(e, item.textKey)}
                    >
                      <span>
                        <Translate textKey={item.textKey} />
                      </span>
                    </Checkbox>
                  ))}
                </div>
              </div>
              <Divider />
              <div className={styles["search__filter__item"]}>
                <div className={styles["search__filter__item__title"]}>
                  <Translate textKey="search.byPrice" />
                </div>
                <div className={styles["search__filter__item__content"]}>
                  <div className={styles["search__filter__price"]}>
                    <input
                      className={styles["search__filter__price__input"]}
                      type="number"
                      ref={minPriceRef}
                    />
                    -
                    <input
                      className={styles["search__filter__price__input"]}
                      type="number"
                      ref={maxPriceRef}
                    />
                  </div>
                  <button
                    className={styles["search__filter__price__btn"]}
                    onClick={() => handleApplyPrice()}
                  >
                    <Translate textKey="search.apply" />
                  </button>
                </div>
              </div>
              <Divider />
            </div>
          )}
        </Col>
        <Col xs={24} sm={19} md={18} lg={20} xl={20}>
          {isLoading ? (
            <div
              style={{
                height: 54,
                overflow: "hidden",
              }}
            >
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
            </div>
          ) : (
            <div className={styles["search__order__group"]}>
              <span>
                <Translate textKey="search.sortBy" />
              </span>
              <div
                className={classNames(styles["search__order__item"], {
                  [styles["search__order__item--active"]]: order === "latest",
                })}
              >
                <button onClick={() => handleOrderChange("latest")}>
                  <Translate textKey="search.latest" />
                </button>
              </div>
              <div
                className={classNames(styles["search__order__item"], {
                  [styles["search__order__item--active"]]: order === "sales",
                })}
              >
                <button onClick={() => handleOrderChange("sales")}>
                  <Translate textKey="search.topSales" />
                </button>
              </div>
              <div className={styles["search__order__item"]}>
                <Select
                  className={styles["search__order__item__price"]}
                  defaultValue={priceText}
                  options={[
                    {
                      value: "desc",
                      label: <Translate textKey="search.priceLowToHigh" />,
                    },
                    {
                      value: "asc",
                      label: <Translate textKey="search.priceHighToLow" />,
                    },
                  ]}
                  bordered={false}
                  onChange={(value) => handleOrderChange(value)}
                />
              </div>
            </div>
          )}

          <ProductList
            keyword={keyword}
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            orderBy={order}
          />
        </Col>
      </Row>
    </div>
  );
};
export default memo(SearchScreen);
