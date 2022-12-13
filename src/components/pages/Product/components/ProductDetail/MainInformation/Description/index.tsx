import React, { memo } from "react";

import styles from "./Description.module.scss";

const Description: React.FC<{
  description: string;
}> = ({ description }) => {
  return (
    <div className={styles["description"]}>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

export default memo(Description);
