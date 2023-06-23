import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, Col, Divider, Row, Select } from "antd";

import categoryList from "~/shared/categories";
import styles from "./Search.module.scss";
import Translate from "~/components/commons/Translate";
import ProductList from "./ProductList";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";

const SearchScreen = () => {
  const router = useRouter();
  const minPriceRef = React.useRef<HTMLInputElement>(null);
  const maxPriceRef = React.useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string>(
    (router.query.categories as string) || ""
  );

  const [order, setOrder] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  const keyword = router.query.keyword as string;

  const handleCategoryChange = (e: CheckboxChangeEvent, category: string) => {
    console.log(e.target.checked, category);
    if (e.target.checked) {
      if (categories === "") {
        console.log("set");
        setCategories(category);
      } else {
        console.log("add");
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
      <Row gutter={12}>
        <Col xs={24} sm={24} md={6} lg={4} xl={4}>
          <div className={styles["search__filter"]}>
            <div className={styles["search__filter__title"]}>Search Filter</div>
            <div className={styles["search__filter__item"]}>
              <div className={styles["search__filter__item__title"]}>
                By Category
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
                Price Range
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
                  Apply
                </button>
              </div>
            </div>
            <Divider />
          </div>
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} xl={20}>
          <div className={styles["search__order__group"]}>
            <span>Sort by</span>
            <div
              className={classNames(styles["search__order__item"], {
                [styles["search__order__item--active"]]: order === "latest",
              })}
            >
              <button onClick={() => handleOrderChange("latest")}>
                Latest
              </button>
            </div>
            <div
              className={classNames(styles["search__order__item"], {
                [styles["search__order__item--active"]]: order === "sales",
              })}
            >
              <button onClick={() => handleOrderChange("sales")}>
                Top Sales
              </button>
            </div>
            <div className={styles["search__order__item"]}>
              <Select
                className={styles["search__order__item__price"]}
                defaultValue="Price"
                options={[
                  { value: "desc", label: "Price: Hight to Low" },
                  { value: "asc", label: "Price: Low to Hight" },
                ]}
                bordered={false}
                onChange={(value) => handleOrderChange(value)}
              />
            </div>
          </div>
          <ProductList
            keyword={keyword}
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            order={order}
          />
        </Col>
      </Row>
    </div>
  );
};
export default memo(SearchScreen);
