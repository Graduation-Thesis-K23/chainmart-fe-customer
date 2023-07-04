import React, { memo } from "react";
import { Rate, Image, Avatar, Divider } from "antd";

import styles from "./Rating.module.scss";
import { Comment } from "~/interfaces";
import { convertTimestamp } from "~/helpers";
import getS3Image from "~/helpers/get-s3-image";

const RatingItem: React.FC<{
  comment: Comment;
}> = ({ comment }) => {
  return (
    <li className={styles["rating-item"]}>
      <Avatar src={getS3Image(comment.avatar)} alt="avt" size="large" />

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
            {convertTimestamp(comment.createdAt)}
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
        <Divider />
      </div>
    </li>
  );
};

export default memo(RatingItem);
