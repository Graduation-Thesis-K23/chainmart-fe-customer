import React, { memo } from "react";

import Footer from "../components/Footer";
import Header from "./components/Header";

const AuthLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default memo(AuthLayout);
