import React, { memo } from "react";

import styles from "./AccountsConnect.module.scss";

const AccountsConnect: React.FC<{
  id: string;
}> = ({ id }) => {
  return (
    <div id={id} className={styles["accounts-connect"]}>
      x
    </div>
  );
};

export default memo(AccountsConnect);
