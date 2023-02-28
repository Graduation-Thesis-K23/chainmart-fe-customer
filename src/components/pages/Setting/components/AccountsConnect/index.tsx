import React, { memo } from "react";
import Image from "next/image";
import useTranslate from "~/hooks/useLocales";

import styles from "./AccountsConnect.module.scss";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import googleSvg from "~/assets/icons/google-color.svg";

const AccountsConnect: React.FC<{
  id: string;
}> = ({ id }) => {
  const accountsText = useTranslate("settings.accountsConnected");
  const connectText = useTranslate("settings.connect");
  const disconnectText = useTranslate("settings.disconnect");

  return (
    <div id={id} className={styles["account"]}>
      <div className={styles["account-header"]}>{accountsText}</div>
      <div className={styles["account-list"]}>
        <div className={styles["account-item"]}>
          <div className={styles["account-item-left"]}>
            <div className={styles["account-item-logo"]}>
              <Image
                src={facebookSvg}
                width={30}
                height={30}
                alt="facebook-logo"
              />
            </div>
            <div className={styles["account-item-username"]}>
              Nguyễn Đại Hiệp
            </div>
          </div>
          <div className={styles["account-item-btn"]}>{connectText}</div>
        </div>
        <div className={styles["account-item"]}>
          <div className={styles["account-item-left"]}>
            <div className={styles["account-item-logo"]}>
              <Image src={googleSvg} width={30} height={30} alt="google-logo" />
            </div>
            <div className={styles["account-item-username"]}>
              hiepnguyen6014@gmail.com
            </div>
          </div>
          <div className={styles["account-item-btn"]}>{disconnectText}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(AccountsConnect);
