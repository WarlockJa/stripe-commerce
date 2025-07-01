"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import cartReducer, { CartAction } from "./cart-reducer";

const CartContext = createContext<CartItem[]>([]);
const CartDispatchContext = createContext<
  ((action: CartAction) => void) | null
>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={items}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);

  if (dispatch === null)
    throw new Error("useCartDispatch should be used inside CartProvider");

  return dispatch;
}
