import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, Col, Divider, Row } from "antd";

import categoryList from "~/shared/categories";
import styles from "./Search.module.scss";
import Translate from "~/components/commons/Translate";
import ProductList from "./ProductList";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const SearchScreen = () => {
  const router = useRouter();
  const minPriceRef = React.useRef<HTMLInputElement>(null);
  const maxPriceRef = React.useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string>(
    (router.query.categories as string) || ""
  );
  const [keyword, setKeyword] = useState<string>(
    (router.query.keyword as string) || ""
  );
  const [order, setOrder] = useState<string>(router.query.orderBy as string);
  const [maxPrice, setMaxPrice] = useState<string>(
    (router.query.maxPrice as string) || ""
  );
  const [minPrice, setMinPrice] = useState<string>(
    (router.query.minPrice as string) || ""
  );

  const setQuery = () => {
    const query = {
      ...(keyword && { keyword }),
      ...(categories && { categories }),
      ...(order && { orderBy: order }),
      ...(maxPrice && { maxPrice }),
      ...(minPrice && { minPrice }),
    };

    router.push({
      pathname: "/search",
      query,
    });
  };

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

    setQuery();
  };

  const handleRangePrice = () => {
    setQuery();
  };

  const enableApplyBtn = () => {
    const newMinPrice = minPriceRef.current?.value;
    const newMaxPrice = maxPriceRef.current?.value;

    if (newMinPrice && newMaxPrice) {
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
    }
  };

  return (
    <div className={styles["search"]}>
      <Row gutter={[24, 24]}>
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
                    onChange={() => enableApplyBtn()}
                    ref={minPriceRef}
                  />
                  -
                  <input
                    className={styles["search__filter__price__input"]}
                    type="number"
                    onChange={() => enableApplyBtn()}
                    ref={maxPriceRef}
                  />
                </div>
                <button
                  className={styles["search__filter__price__btn"]}
                  disabled={Number(minPrice) >= Number(maxPrice)}
                  onClick={() => handleRangePrice()}
                >
                  Apply
                </button>
              </div>
            </div>
            <Divider />
          </div>
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} xl={20}>
          <div>{categories}</div>
          <ProductList />
        </Col>
      </Row>
    </div>
  );
};
export default memo(SearchScreen);
