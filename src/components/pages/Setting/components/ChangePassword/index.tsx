import React, { memo } from "react";

import styles from "./ChangePassword.module.scss";

const ChangePassword: React.FC<{
  id: string;
}> = ({ id }) => {
  return (
    <div id={id} className={styles["password"]}>
      ChangePassword
    </div>
  );
};

export default memo(ChangePassword);
