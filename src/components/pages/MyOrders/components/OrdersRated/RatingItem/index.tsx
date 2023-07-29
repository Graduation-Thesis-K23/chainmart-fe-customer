import React, { memo } from "react";
import { Rate, Image } from "antd";

import styles from "./Rating.module.scss";
import { convertPrice, convertTimestamp } from "~/helpers";
import getS3Image from "~/helpers/get-s3-image";
import { RateType } from "..";

const RatingItem: React.FC<{
  comment: RateType;
}> = ({ comment }) => {
  return (
    <li className={styles["rating-item"]}>
      <div className={styles["order__list__item"]}>
        <div className={styles["order__list__item__image"]}>
          <Image
            src={getS3Image(comment.product.image)}
            alt={comment.product.name}
            width={90}
            height={90}
          />
        </div>
        <div className={styles["order__list__item__nq"]}>
          <p className={styles["order__list__item__nq__name"]}>
            {comment.product.name}
          </p>
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
        {comment.images.length > 0 && (
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
        )}
      </div>
    </li>
  );
};

export default memo(RatingItem);
