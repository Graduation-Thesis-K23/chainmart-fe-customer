import React, { memo, ReactElement } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./MainLayout.module.scss";

/* dynamic(() => {
  return new Promise((resolve) => setTimeout(resolve, 2 * 1000)).then(
    () => import("~pages/Index")
  );
}); */

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => (
  <>
    <Header />
    <main className={styles["main-layout"]}>{children}</main>
    <Footer />
  </>
);

export default memo(MainLayout);
