// libs
import React from "react";
// components
import CustomIcon from "./CustomIcon";

const ExpandSvg: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
    <path d="m10 13.062-5-5L6.062 7 10 10.938 13.938 7 15 8.062Z" />
  </svg>
);

const ExpandIcon = () => (
  <CustomIcon
    component={ExpandSvg}
    style={{
      fill: "white",
    }}
  />
);

export default ExpandIcon;
