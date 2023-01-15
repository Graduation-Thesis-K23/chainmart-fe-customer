// libs
import React from "react";
// components
import BottomCartItem from "./Item";
import useCart from "~/contexts/CartContext";

const BottomCartList = () => {
  const { cart } = useCart();

  return (
    <>
      {cart.map((product) => (
        <BottomCartItem
          key={product.id}
          href={"/" + product.slug}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </>
  );
};

export default BottomCartList;
