import dynamic from "next/dynamic";
import React, { memo, ReactElement, useEffect } from "react";

const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const Header = dynamic(() => import("../components/Header"), { ssr: false });

import styles from "./MainLayout.module.scss";
import { checkCookieToken, useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import Loading from "~/components/atomics/Loading";

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const { status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkCookieToken());
  }, [dispatch]);

  return (
    <>
      <Loading
        display={
          status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING
        }
      />
      <Header />
      <main className={styles["main-layout"]}>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
