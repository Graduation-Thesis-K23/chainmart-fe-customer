import React, { memo, ReactElement, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./MainLayout.module.scss";
import { checkCookieToken, useAppDispatch } from "~/redux";

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkCookieToken());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={styles["main-layout"]}>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
