import React, { createContext, ReactNode, useContext, useState } from "react";

import WishlistModal from "../components/wishlist/WishlistModal";
import { useSessionStorage } from "../hooks/useSessionStorage";

type WishlistContextType = {
  openWishlist: () => void;
  closeWishlist: () => void;
  addWishlistItem: (id: number) => void;
  removeWishlistItem: (id: number) => void;
  clearWishlist: () => void;
  wishlistItems: WishlistItemType[];
};

const WishlistContext = createContext({} as WishlistContextType);

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};

export interface WishlistItemType {
  id: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const WishlistContextProvider = ({ children }: CartContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wishlistItems, setWishlistItems] = useSessionStorage<
    WishlistItemType[]
  >("wishlist", []);

  function addWishlistItem(id: number) {
    setWishlistItems((currentItems) => {
      const searchedWishlistItem = currentItems.find((item) => item.id === id);

      if (searchedWishlistItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item } : item
        );
      }

      return [...currentItems, { id }];
    });
  }

  function removeWishlistItem(id: number) {
    setWishlistItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function clearWishlist() {
    setWishlistItems([]);
  }

  function openWishlist() {
    setIsOpen(true);
  }
  function closeWishlist() {
    setIsOpen(false);
  }

  return (
    <WishlistContext.Provider
      value={{
        openWishlist,
        closeWishlist,
        addWishlistItem,
        removeWishlistItem,
        clearWishlist,
        wishlistItems,
      }}
    >
      {children}
      <WishlistModal isOpen={isOpen} />
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
