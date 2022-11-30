import React, { ReactElement } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default MainLayout;
