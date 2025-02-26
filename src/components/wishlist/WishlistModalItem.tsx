import { useEffect, useState } from "react";

import { AxiosRequestConfig } from "axios";

import { WishlistModalItemTemplate } from "src/components/wishlist/WishlistModalItemTemplate";
import { IMAGE_TYPE } from "src/constants/Configs";
import { useWishlistContext } from "src/context/WishlistContext";
import useFetchData from "src/hooks/useFetchData";

interface WishlistModalItemProps {
  id: number;
}

export function WishlistModalItem({ id }: WishlistModalItemProps) {
  const { removeWishlistItem } = useWishlistContext();

  const [imageRequestConfig, setImageRequestConfig] =
    useState<AxiosRequestConfig>({});

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${id}`,
    method: "GET",
  };

  const [{
    data: boardgameData,
    boardgameLoading,
    boardgameError,
  }] = useFetchData(boardgameRequestConfig);

  useEffect(() => {
    if (boardgameData.image) {
      setImageRequestConfig({
        url: `/blobs/${boardgameData.image}`,
        method: "GET",
        responseType: IMAGE_TYPE,
      });
    }
  }, [boardgameData]);

  const [{
    data: imageData,
    imageLoading,
    imageError,
  }] = useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  return (
    <WishlistModalItemTemplate
      boardgame={boardgameData}
      blobImage={blobImage}
      localRemoveWishlistItem={removeWishlistItem}
    />
  );
}
