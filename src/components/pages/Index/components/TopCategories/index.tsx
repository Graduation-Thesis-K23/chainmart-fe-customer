import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import styles from "./TopCategories.module.scss";
import topCategories from "~/apis/mocks/TopCategories";
import useDebounce from "~/hooks/useDebounce";
import useTranslate from "~/hooks/useTranslate";

const TopCategories = () => {
  const [translateX, setTranslateX] = useState(0);
  const [XY, setXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [action, setAction] = useState<number>(0); // 1 ->, -1 <-
  const debouncedAction = useDebounce<number>(action, 200);

  const data = useMemo(() => {
    const size = topCategories.length;

    return {
      size,
      itemWidth: 146,
      swipeSize: 300,
      listWidth: (146 + 20) * size,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAction]);

  return (
    <div className={styles["top_categories"]}>
      <div className="container">
        <div className={styles["title"]}>
          <div className={styles["title_text"]}>
            {useTranslate("categories.header")}
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
        <div
          className={styles["top_categories_list"]}
          id="list-categories"
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
        >
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
                  aria-label={item.text}
                  className={styles["top_categories_list_item_link"]}
                >
                  <Image
                    className={styles["top_categories_list_item_image"]}
                    src={item.src}
                    alt={item.text}
                    width={90}
                    height={90}
                  />
                  <span className={styles["top_categories_list_item_text"]}>
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(TopCategories);
