import Link from "next/link";
import React from "react";

import styles from "./404.module.scss";
import useTranslate from "~/hooks/useLocales";

const Page404 = () => {
  const notify = useTranslate("404");
  const home = useTranslate("home");

  return (
    <div className={styles["center"]}>
      <div className={styles["error"]}>
        <div className={styles["number"]}>4</div>
        <div className={styles["illustration"]}>
          <div className={styles["circle"]}></div>
          <div className={styles["clip"]}>
            <div className={styles["paper"]}>
              <div className={styles["face"]}>
                <div className={styles["eyes"]}>
                  <div className={styles["eye eye-left"]}></div>
                  <div className={styles["eye eye-right"]}></div>
                </div>
                <div className={styles["rosyCheeks rosyCheeks-left"]}></div>
                <div className={styles["rosyCheeks rosyCheeks-right"]}></div>
                <div className={styles["mouth"]}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["number"]}>4</div>
      </div>
      <div className={styles["text"]}>{notify}</div>
      <Link href="/" prefetch={false} className={styles["button"]}>
        <span>{home}</span>
      </Link>
    </div>
  );
};

export default Page404;
