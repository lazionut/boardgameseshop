import React, { createContext, ReactNode, useContext, useState } from "react";

import CartDrawer from "../components/cart/CartDrawer";
import { useSessionStorage } from "../hooks/useSessionStorage";

type CartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getCartItemQuantity: (id: number) => number;
  setCartItemQuantity: (id: number, quantityProp: number) => void;
  increaseCartItemQuantity: (id: number) => void;
  decreaseCartItemQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItemType[];
};

const CartContext = createContext({} as CartContextType);

export const useCartContext = () => {
  return useContext(CartContext);
};

export interface CartItemType {
  id: number;
  quantity: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useSessionStorage<CartItemType[]>(
    "cart",
    []
  );

  function getCartItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function setCartItemQuantity(id: number, quantityProp: number) {
    setCartItems((currentItems) => {
      const searchedItem = currentItems.find((item) => item.id === id);

      if (searchedItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: quantityProp } : item
        );
      }

      return currentItems;
    });
  }

  function increaseCartItemQuantity(id: number) {
    setCartItems((currentItems) => {
      const searchedItem = currentItems.find((item) => item.id === id);

      if (searchedItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { id, quantity: 1 }];
    });
  }

  function decreaseCartItemQuantity(id: number) {
    setCartItems((currentItems) => {
      const searchedItem = currentItems.find((item) => item.id === id);

      if (searchedItem) {
        return searchedItem.quantity === 1
          ? currentItems.filter((item) => item.id !== id)
          : currentItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
      }

      return currentItems;
    });
  }

  function removeCartItem(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider
      value={{
        getCartItemQuantity,
        setCartItemQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeCartItem,
        openCart,
        closeCart,
        clearCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <CartDrawer isOpen={isOpen} />
    </CartContext.Provider>
  );
};

export default CartContextProvider;
