import React, { useEffect, useState, memo } from "react";

import RatingItem from "./RatingItem";
import RatingHeader from "./RatingHeader";
import RatingFilter from "./RatingFilter";

import styles from "./Rating.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";
import { Comment } from "~/interfaces";
import getRatingProduct from "~/apis/Product/get-rating-product";

const Rating = () => {
  const { id } = useProductDetail().productDetail;
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    const temp = getRatingProduct(id);

    if (temp) {
      setComments(temp);
    }
  }, [id]);

  console.log(comments);

  return (
    <div className={styles["rating"]}>
      <RatingHeader />
      <RatingFilter />
      <ul className={styles["rating-list"]}>
        {comments.map((comment) => (
          <RatingItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default memo(Rating);
