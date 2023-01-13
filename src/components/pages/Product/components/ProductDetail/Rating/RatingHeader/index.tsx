import React, { memo } from "react";

import styles from "./RatingHeader.module.scss";
import useTranslate from "~/hooks/useTranslate";

const RatingHeader = () => {
  const productRatingHeader = useTranslate("product.ratingHeader");

  return <p className={styles["rating-header"]}>{productRatingHeader}</p>;
};

export default memo(RatingHeader);
