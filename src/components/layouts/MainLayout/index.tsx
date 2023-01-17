import React, { memo, ReactElement } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./MainLayout.module.scss";

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => (
  <div className={styles["main-layout"]}>
    <Header />
    {children}
    <Footer />
  </div>
);

export default memo(MainLayout);
