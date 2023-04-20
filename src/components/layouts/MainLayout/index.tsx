import React, { memo, ReactElement, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./MainLayout.module.scss";
import { checkCookieToken, useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import Loading from "~/components/atomics/Loading";

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkCookieToken());
  }, [dispatch]);

  if (
    user.status === ASYNC_STATUS.IDLE ||
    user.status === ASYNC_STATUS.LOADING
  ) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className={styles["main-layout"]}>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
