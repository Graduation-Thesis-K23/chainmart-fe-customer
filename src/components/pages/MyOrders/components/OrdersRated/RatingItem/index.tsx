import React, { memo } from "react";
import { Rate, Image } from "antd";

import styles from "./Rating.module.scss";
import { convertPrice, convertTimestamp } from "~/helpers";
import getS3Image from "~/helpers/get-s3-image";
import { RateType } from "..";
import Link from "next/link";

const RatingItem: React.FC<{
  comment: RateType;
}> = ({ comment }) => {
  console.log("RatingItem", comment.images);
  return (
    <li className={styles["rating-item"]}>
      <div className={styles["order__list__item"]}>
        {comment.images ? (
          <div className={styles["order__list__item__image"]}>
            <Image
              src={getS3Image(comment.product.image)}
              alt={comment.product.name}
              width={90}
              height={90}
            />
          </div>
        ) : (
          <></>
        )}
        <div className={styles["order__list__item__nq"]}>
          <Link
            href={comment.product.slug}
            className={styles["order__list__item__nq__name"]}
            as={`/${comment.product.slug}`}
          >
            {comment.product.name}
          </Link>
        </div>
        <div className={styles["order__list__item__price"]}>
          <span className={styles["order__list__item__price__1"]}>
            {convertPrice(comment.product.price)}
          </span>
        </div>
      </div>
      <div className={styles["rating-item-info"]}>
        <div className={styles["rating-item-info-top"]}>
          <Rate
            className={styles["rating-item-info-top-star"]}
            disabled
            defaultValue={comment.star}
          />
        </div>
        <div className={styles["rating-item-info-mid"]}>
          <span className={styles["rating-item-info-mid-time"]}>
            {convertTimestamp(comment.created_at)}
          </span>
        </div>
        {comment.comment && (
          <div className={styles["rating-item-info-bottom"]}>
            <p className={styles["rating-item-info-bottom-content"]}>
              {comment.comment}
            </p>
          </div>
        )}
        {comment.images ? (
          <div className={styles["rating-item-info-image"]}>
            <Image.PreviewGroup>
              {comment.images.map((image, index) => (
                <Image
                  key={index}
                  src={getS3Image(image)}
                  alt="comment-image"
                  width={72}
                  height={72}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default memo(RatingItem);
