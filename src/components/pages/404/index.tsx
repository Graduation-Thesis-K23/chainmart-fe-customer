import Link from "next/link";
import React from "react";

import MainLayout from "~layouts/MainLayout";

import styles from "./404.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const Page404 = () => {
  return (
    <MainLayout>
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
        <div className={styles["text"]}>{translate("404")}</div>
        <Link href="/" prefetch={false}>
          <a className={styles["button"]}>{translate("home")}</a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Page404;
