import React, { memo } from "react";
import { Rate, Image, Avatar, Divider } from "antd";

import styles from "./Rating.module.scss";
import { Comment } from "~/interfaces";
import { convertTimestamp } from "~/helpers";

const RatingItem: React.FC<{
  comment: Comment;
}> = ({ comment }) => {
  return (
    <li className={styles["rating-item"]}>
      <Avatar src={comment.avatar} alt="avt" size="large" />

      <div className={styles["rating-item-info"]}>
        <div className={styles["rating-item-info-top"]}>
          <p className={styles["rating-item-info-top-name"]}>{comment.name}</p>
          <Rate
            className={styles["rating-item-info-top-star"]}
            disabled
            defaultValue={comment.star}
          />
        </div>
        <div className={styles["rating-item-info-mid"]}>
          <span className={styles["rating-item-info-mid-time"]}>
            {convertTimestamp(comment.timestamp)}
          </span>
          |
          <span className={styles["rating-item-info-mid-classify"]}>
            {comment.classify}
          </span>
        </div>
        {comment.content && (
          <div className={styles["rating-item-info-bottom"]}>
            <p className={styles["rating-item-info-bottom-content"]}>
              {comment.content}
            </p>
          </div>
        )}
        {comment.images && (
          <div className={styles["rating-item-info-image"]}>
            {comment.images.map((image) => (
              <Image
                key={image.id}
                src={image.src}
                alt="comment-image"
                width={72}
                height={72}
              />
            ))}
          </div>
        )}
        <Divider />
      </div>
    </li>
  );
};

export default memo(RatingItem);
