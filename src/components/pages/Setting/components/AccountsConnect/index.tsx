import React, { memo, useEffect } from "react";
import Image from "next/image";

import styles from "./AccountsConnect.module.scss";
import facebookSvg from "~/assets/icons/facebook-color.svg";
import Translate from "~/components/commons/Translate";
import googleSvg from "~/assets/icons/google-color.svg";
import { fetchAccounts, useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import { Spin } from "antd";
import { toast } from "react-toastify";
import useTranslate from "~/hooks/useLocales";

const AccountsConnect: React.FC<{
  id: string;
}> = ({ id }) => {
  const { account, user } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { status, data } = account;

  const maintainText = useTranslate("settings.maintainFeature");

  const handleDisconnectFacebook = () => {
    toast.info(maintainText);
  };

  useEffect(() => {
    if (user.status === ASYNC_STATUS.SUCCEED) {
      dispatch(fetchAccounts(user.data.username));
    }
  }, []);

  if (status !== ASYNC_STATUS.SUCCEED) {
    return (
      <div
        id={id}
        className={styles["account"]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
        }}
      >
        <Spin tip="Loading" size="large" />;
      </div>
    );
  }

  return (
    <div id={id} className={styles["account"]}>
      <div className={styles["account-header"]}>
        <Translate textKey="settings.accountsConnected" />
      </div>
      <div className={styles["account-list"]}>
        <div className={styles["account-item"]}>
          {data.facebook ? (
            <>
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
                  {data.facebook}
                </div>
              </div>
              <div
                className={styles["account-item-btn"]}
                onClick={() => handleDisconnectFacebook()}
              >
                <Translate textKey="settings.disconnect" />
              </div>
            </>
          ) : (
            <>
              <div className={styles["account-item-left"]}>
                <div className={styles["account-item-logo"]}>
                  <Image
                    src={facebookSvg}
                    width={30}
                    height={30}
                    alt="facebook-logo"
                  />
                </div>
                <div className={styles["account-item-username"]}>Facebook</div>
              </div>
              <div
                className={styles["account-item-btn"]}
                onClick={() => handleDisconnectFacebook()}
              >
                <Translate textKey="settings.connect" />
              </div>
            </>
          )}
        </div>
        <div className={styles["account-item"]}>
          {data.email ? (
            <>
              <div className={styles["account-item-left"]}>
                <div className={styles["account-item-logo"]}>
                  <Image
                    src={googleSvg}
                    width={30}
                    height={30}
                    alt="google-logo"
                  />
                </div>
                <div className={styles["account-item-username"]}>
                  {data.email ? <span>{data.email}</span> : <span>Google</span>}
                </div>
              </div>
              <div
                className={styles["account-item-btn"]}
                onClick={() => handleDisconnectFacebook()}
              >
                <Translate textKey="settings.disconnect" />
              </div>
            </>
          ) : (
            <>
              <div className={styles["account-item-left"]}>
                <div className={styles["account-item-logo"]}>
                  <Image
                    src={googleSvg}
                    width={30}
                    height={30}
                    alt="google-logo"
                  />
                </div>
                <div className={styles["account-item-username"]}>
                  <span>Google</span>
                </div>
              </div>
              <div
                className={styles["account-item-btn"]}
                onClick={() => handleDisconnectFacebook()}
              >
                <Translate textKey="settings.connect" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AccountsConnect);
