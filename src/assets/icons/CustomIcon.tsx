// libs
import React from "react";
import Icon from "@ant-design/icons";

interface Props {
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  style?: React.CSSProperties;
}

const CustomIcon = ({ component, style }: Props) => (
  <Icon component={component} style={style} />
);

export default CustomIcon;
