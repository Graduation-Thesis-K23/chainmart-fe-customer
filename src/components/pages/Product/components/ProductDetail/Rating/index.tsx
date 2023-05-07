import React, { useEffect, useState, memo } from "react";

import RatingItem from "./RatingItem";
import RatingFilter from "./RatingFilter";

import styles from "./Rating.module.scss";
import { Comment } from "~/interfaces";
import useTranslate from "~/hooks/useLocales";
import getRatingProduct from "~/apis/Product/get-rating-product";

const Rating = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);

  const productRatingHeader = useTranslate("product.ratingHeader");

  useEffect(() => {
    const temp = getRatingProduct(1);

    if (temp) {
      setComments(temp);
    }
  }, []);

  return (
    <div className={styles["rating"]}>
      <p className={styles["rating_header"]}>{productRatingHeader}</p>
      <RatingFilter />
      <ul className={styles["rating_list"]}>
        {comments.map((comment) => (
          <RatingItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default memo(Rating);
