// libs
import React, { memo, ReactElement } from "react";

const AuthLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => <>{children}</>;

export default memo(AuthLayout);
