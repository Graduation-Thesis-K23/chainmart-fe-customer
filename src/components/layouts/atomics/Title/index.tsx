import React, { memo } from "react";

import styles from "./Title.module.scss";

const Title: React.FC<{
  text: string;
}> = ({ text }) => <div className={styles["title"]}>{text}</div>;

export default memo(Title);
