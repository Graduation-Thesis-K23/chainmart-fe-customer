// libs
import React from "react";
// components
import CustomIcon from "./CustomIcon";

const LocationSvg: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
    <path d="M10 9.792q.604 0 1.031-.427.427-.427.427-1.032 0-.604-.427-1.031-.427-.427-1.031-.427-.604 0-1.031.427-.427.427-.427 1.031 0 .605.427 1.032.427.427 1.031.427Zm0 6.646q2.562-2.313 3.865-4.376Q15.167 10 15.167 8.5q0-2.396-1.49-3.865Q12.188 3.167 10 3.167q-2.188 0-3.677 1.468-1.49 1.469-1.49 3.865 0 1.5 1.302 3.562Q7.438 14.125 10 16.438Zm0 1.666q-3.25-2.854-4.833-5.229Q3.583 10.5 3.583 8.5q0-3.042 1.927-4.812Q7.438 1.917 10 1.917q2.562 0 4.49 1.771 1.927 1.77 1.927 4.812 0 2-1.584 4.375Q13.25 15.25 10 18.104ZM10 8.5Z" />
  </svg>
);

const LocationIcon = () => (
  <CustomIcon
    component={LocationSvg}
    style={{
      fill: "white",
    }}
  />
);

export default LocationIcon;
