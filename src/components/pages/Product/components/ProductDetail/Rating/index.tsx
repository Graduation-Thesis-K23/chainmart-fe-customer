import React, { useEffect, memo, useMemo } from "react";
import { Progress, Rate, Spin } from "antd";

import styles from "./Rating.module.scss";
import Translate from "~/components/commons/Translate";
import {
  ASYNC_STATUS,
  fetchRating,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import RatingItem from "./RatingItem";

const StarPercent: React.FC<{
  star: number;
  percent: number;
}> = ({ star, percent }) => {
  return (
    <div className={styles["rating-filter-bottom-level"]}>
      <Rate
        className={styles["rating-filter-bottom-level-star"]}
        disabled
        defaultValue={star}
      />
      <Progress percent={percent} showInfo={false} strokeColor="#B2B2B2" />
    </div>
  );
};

const Rating = () => {
  const dispatch = useAppDispatch();
  const productId = useAppSelector((state) => state.product.data.id);

  const { data: ratingData, status } = useAppSelector((state) => state.rating);

  const [
    percentOneStar,
    percentTwoStar,
    percentThreeStar,
    percentFourStar,
    percentFiveStar,
  ] = useMemo(() => {
    const {
      numberOfOneStar,
      numberOfTwoStar,
      numberOfThreeStar,
      numberOfFourStar,
      numberOfFiveStar,
    } = ratingData;

    const total =
      numberOfOneStar +
      numberOfTwoStar +
      numberOfThreeStar +
      numberOfFourStar +
      numberOfFiveStar;

    if (total > 0) {
      return [
        (numberOfOneStar / total) * 100,
        (numberOfTwoStar / total) * 100,
        (numberOfThreeStar / total) * 100,
        (numberOfFourStar / total) * 100,
        (numberOfFiveStar / total) * 100,
      ];
    } else {
      return [0, 0, 0, 0, 0];
    }
  }, [ratingData]);

  useEffect(() => {
    dispatch(fetchRating(productId));
  }, [dispatch]);

  if (status !== ASYNC_STATUS.SUCCEED) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles["rating"]}>
      <p className={styles["rating_header"]}>
        <Translate textKey="productRatingHeader" />
      </p>
      <div className={styles["rating-filter"]}>
        <div>
          <div className={styles["rating-filter-top"]}>
            <p className={styles["rating-filter-top-index"]}>
              {ratingData.averageStar}
            </p>
            <div>
              <Rate disabled value={ratingData.averageStar} allowHalf />
              <p className={styles["rating-filter-top-text"]}>
                {ratingData.numberOfComment}{" "}
                <Translate textKey="product.numberOfComment" />
              </p>
            </div>
          </div>
          <div className={styles["rating-filter-bottom"]}>
            <StarPercent star={5} percent={percentFiveStar} />
            <StarPercent star={4} percent={percentFourStar} />
            <StarPercent star={3} percent={percentThreeStar} />
            <StarPercent star={2} percent={percentTwoStar} />
            <StarPercent star={1} percent={percentOneStar} />
          </div>
        </div>
        <div className={styles["rating-filter-right"]}></div>
      </div>
      <ul className={styles["rating_list"]}>
        {ratingData.comments.map((comment) => (
          <RatingItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default memo(Rating);
