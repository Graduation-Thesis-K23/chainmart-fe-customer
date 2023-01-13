import React from "react";
import { Rate, Progress } from "antd";

import styles from "./RatingFilter.module.scss";

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

const RatingFilter = () => {
  return (
    <div className={styles["rating-filter"]}>
      <div>
        <div className={styles["rating-filter-top"]}>
          <p className={styles["rating-filter-top-index"]}>4.9</p>
          <div>
            <Rate disabled defaultValue={5} />
            <p className={styles["rating-filter-top-text"]}>15 nhận xét</p>
          </div>
        </div>
        <div className={styles["rating-filter-bottom"]}>
          <StarPercent star={5} percent={20} />
          <StarPercent star={4} percent={30} />
          <StarPercent star={3} percent={40} />
          <StarPercent star={2} percent={50} />
          <StarPercent star={1} percent={60} />
        </div>
      </div>
      <div className={styles["rating-filter-right"]}></div>
    </div>
  );
};

export default RatingFilter;
