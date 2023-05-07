import dynamic from "next/dynamic";
import React, { memo } from "react";

const Header = dynamic(() => import("./components/Header"), { ssr: false });

const SettingLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default memo(SettingLayout);
