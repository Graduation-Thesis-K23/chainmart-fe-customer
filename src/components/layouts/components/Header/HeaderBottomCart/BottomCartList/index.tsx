// libs
import React from "react";
// components
import BottomCartItem from "./Item";

export default [
  {
    key: "1",
    label: (
      <BottomCartItem
        href="0"
        image="/avt.webp"
        name="COMBO Giá treo màn hình NB-F80 + Kẹp Laptop 10-17.3NCH"
        price={100000}
      />
    ),
  },
  {
    key: "2",
    label: (
      <BottomCartItem
        href="1"
        image="/avt.webp"
        name="COMBO Giá treo màn hình NB-F80 + Kẹp Laptop 10-17.3NCH + Kẹp Laptop 10-17.3NCH"
        price={230000000}
      />
    ),
  },
  {
    key: "3",
    label: (
      <BottomCartItem
        href="2"
        image="/avt.webp"
        name="COMBO Giá treo màn hình"
        price={1009009}
      />
    ),
  },
];
