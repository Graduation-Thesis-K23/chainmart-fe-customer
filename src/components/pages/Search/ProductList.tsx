import React, { FC, Fragment, memo, useEffect } from "react";
import Image from "next/image";
import { Button, Rate, Skeleton } from "antd";

import styles from "./ProductList.module.scss";
import Translate from "~/components/commons/Translate";
import convertNumberToK from "~/helpers/convert-to-k";
import {
  ASYNC_STATUS,
  FilterPayload,
  filterProducts,
  loadMoreProducts,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import Link from "next/link";
import getS3Image from "~/helpers/get-s3-image";
import { convertPrice, discount } from "~/helpers";

const ProductList: FC<{
  keyword: string;
  categories: string;
  minPrice: string;
  maxPrice: string;
  orderBy: string;
}> = ({ keyword, categories, minPrice, maxPrice, orderBy }) => {
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleLoadMoreSearchProducts = () => {
    dispatch(
      loadMoreProducts({
        keyword,
        ...(categories !== "" && { categories }),
        ...(minPrice !== "" && { minPrice }),
        ...(maxPrice !== "" && { maxPrice }),
        ...(orderBy !== "" && { orderBy }),
        page: filter.metadata.page + 1,
      })
    );
  };

  const isLoading =
    filter.status === ASYNC_STATUS.LOADING ||
    filter.status === ASYNC_STATUS.IDLE;

  useEffect(() => {
    // create filter payload and ignore empty fields
    const filterPayload: FilterPayload = {
      keyword,
      ...(categories !== "" && { categories }),
      ...(minPrice !== "" && { minPrice }),
      ...(maxPrice !== "" && { maxPrice }),
      ...(orderBy !== "" && { orderBy }),
      page: 1,
    };

    dispatch(filterProducts(filterPayload));
  }, [keyword, categories, minPrice, maxPrice, orderBy, dispatch]);

  if (filter.status === ASYNC_STATUS.FAILED) {
    return (
      <div className={styles["loading"]}>
        <button
          onClick={() => {
            dispatch(
              filterProducts({
                keyword,
                ...(categories !== "" && { categories }),
                ...(minPrice !== "" && { minPrice }),
                ...(maxPrice !== "" && { maxPrice }),
                ...(orderBy !== "" && { orderBy }),
              })
            );
          }}
        >
          <Translate textKey="search.reload" />
        </button>
      </div>
    );
  }

  if (filter.status === ASYNC_STATUS.SUCCEED && filter.data.length === 0) {
    return (
      <div className={styles["loading"]}>
        <Translate textKey="notFound.product" />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridGap: "10px",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            listStyle: "none",
            margin: "20px 0",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Fragment key={index}>
              <Skeleton.Input
                active
                block
                style={{
                  height: "336px",
                }}
              />
            </Fragment>
          ))}
        </div>
      ) : (
        <>
          <ul className={styles["products-list"]}>
            {filter.data.map((item) => (
              <li key={item.id} className={styles["products-list-item"]}>
                <Link
                  href={"/[slug]"}
                  as={"/" + item.slug}
                  className={styles["product-card"]}
                >
                  <div className={styles["product-card"]}>
                    <div className={styles["product-card-label"]}>
                      <span className={styles["product-card-label-text"]}>
                        New
                      </span>
                    </div>

                    {item.sale > 0 ? (
                      <div className={styles["product-card-discount"]}>
                        <span
                          className={styles["product-card-discount-percent"]}
                        >
                          {item.sale}%
                        </span>
                        <span className={styles["product-card-discount-text"]}>
                          off
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className={styles["product-card-image"]}>
                      <Image
                        src={getS3Image(item.images[0])}
                        fill
                        sizes="(max-width: 768px) 40vw, (max-width: 1200px) 45vw, 50vw"
                        alt={item.slug}
                        priority
                      />
                    </div>
                    <div className={styles["product-card-body"]}>
                      <span className={styles["product-card-body-name"]}>
                        {item.name}
                      </span>
                      <div className={styles["product-card-body-prices"]}>
                        <span
                          className={styles["product-card-body-prices-one"]}
                        >
                          {convertPrice(item.price)}
                        </span>
                        {item.sale && (
                          <span
                            className={styles["product-card-body-prices-two"]}
                          >
                            {convertPrice(discount(item.price, item.sale))}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles["product-card-footer"]}>
                      {
                        item.sale > 0 && (
                          <div className={styles["product-card-footer-star"]}>
                            <Rate
                              className={
                                styles["product-card-footer-star-item"]
                              }
                              disabled
                              allowHalf
                              value={item.sale}
                            />
                          </div>
                        ) /* : (
                  <span></span>
                  ) */
                      }
                      {item.sale > 0 && (
                        <div className={styles["product-card-footer-sold"]}>
                          <span>
                            {convertNumberToK(item.sale) + " "}
                            <Translate textKey="products.sold" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles["load-more__btn"]}>
            <Button
              loading={filter.status === ASYNC_STATUS.LOADING}
              className={styles["load-more__btn__element"]}
              onClick={handleLoadMoreSearchProducts}
            >
              <Translate textKey="loadMore.btn" />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default memo(ProductList);
