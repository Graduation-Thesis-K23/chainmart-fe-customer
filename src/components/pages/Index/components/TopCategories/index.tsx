import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Skeleton } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import styles from "./TopCategories.module.scss";
import topCategories from "~/sub-categories/categories";
import useDebounce from "~/hooks/useDebounce";
import Translate from "~/components/commons/Translate";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

const TopCategories = () => {
  const [translateX, setTranslateX] = useState(0);
  const [XY, setXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [action, setAction] = useState<number>(0); // 1 ->, -1 <-
  const debouncedAction = useDebounce<number>(action, 200);

  const { status: userStatus } = useAppSelector((state) => state.user);
  const isLoading =
    userStatus === ASYNC_STATUS.LOADING || userStatus === ASYNC_STATUS.IDLE;

  const data = useMemo(() => {
    const size = topCategories.length;

    return {
      size,
      itemWidth: 146,
      swipeSize: 300,
      listWidth: (146 + 20) * (size - 1),
    };
  }, []);

  const onPrev = useCallback(
    (swipeSize = data.swipeSize) => {
      if (translateX < swipeSize) {
        setTranslateX(0);
      } else {
        setTranslateX((prev) => prev - swipeSize);
      }
    },
    [translateX, data.swipeSize]
  );

  const onNext = useCallback(
    (swipeSize = data.swipeSize) => {
      const listWidth =
        document.getElementById("list-categories")?.clientWidth || 0;

      const hiddenWidth = data.listWidth - listWidth;

      if (translateX + data.itemWidth > hiddenWidth) {
        setTranslateX(hiddenWidth);
      } else {
        setTranslateX((prev) => prev + swipeSize);
      }
    },
    [data.itemWidth, data.listWidth, data.swipeSize, translateX]
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const temp = e.touches[0];
    setXY({
      x: temp.clientX,
      y: temp.clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = XY.x - xUp;
    const yDiff = XY.y - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff < 0) {
        setAction(-Date.now());
      } else {
        setAction(Date.now());
      }
    }
  };

  useEffect(() => {
    if (debouncedAction === 0) {
      return;
    }
    if (debouncedAction < 0) {
      onPrev(220);
    } else {
      onNext(220);
    }
  }, [debouncedAction]);

  return (
    <section className={styles["top_categories"]}>
      <div className="container">
        {isLoading ? (
          <Skeleton.Input active size="large" block />
        ) : (
          <div className={styles["title"]}>
            <div className={styles["title_text"]}>
              <Translate textKey="categories.header" />
            </div>
            <div className={styles["title_controller"]}>
              <Button
                className={styles["btn"]}
                shape="circle"
                size="small"
                icon={
                  <LeftOutlined
                    style={{
                      fontSize: "8px",
                    }}
                  />
                }
                onClick={() => onPrev()}
              />
              <Button
                className={styles["btn"]}
                shape="circle"
                size="small"
                icon={
                  <RightOutlined
                    style={{
                      fontSize: "8px",
                    }}
                  />
                }
                onClick={() => onNext()}
              />
            </div>
          </div>
        )}
        <div
          className={styles["top_categories_list"]}
          id="list-categories"
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
        >
          {isLoading ? (
            <div
              style={{
                width: "1200px",
                height: "210px",
                overflow: "hidden",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "145px",
                    height: "210px",
                    overflow: "hidden",
                    marginRight: "24px",
                    display: "inline-block",
                  }}
                >
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                  <Skeleton.Input size="large" />
                </div>
              ))}
            </div>
          ) : (
            <ul
              className={styles["top_categories_list_inner"]}
              style={{
                width: data.listWidth,
                transform: `translateX(${-translateX}px)`,
              }}
            >
              {topCategories.map((item) => (
                <li
                  key={item.id}
                  className={styles["top_categories_list_item"]}
                  style={{
                    width: data.itemWidth,
                  }}
                >
                  <Link
                    href={item.href}
                    prefetch={false}
                    aria-label={item.textKey}
                    className={styles["top_categories_list_item_link"]}
                  >
                    <Image
                      className={styles["top_categories_list_item_image"]}
                      src={item.src}
                      alt={item.textKey}
                      width={90}
                      height={90}
                    />
                    <span className={styles["top_categories_list_item_text"]}>
                      <Translate textKey={item.textKey} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(TopCategories);
