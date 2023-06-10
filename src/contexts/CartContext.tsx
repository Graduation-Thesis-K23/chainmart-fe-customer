import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { ICart } from "~/interfaces";

interface ICartContext {
  cart: Array<ICart>;
  setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
});

export const CartProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", [] as Array<ICart>);

  const value: ICartContext = useMemo(
    () => ({ cart, setCart }),
    [cart, setCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export default useCart;
