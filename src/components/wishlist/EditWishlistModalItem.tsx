import useFetchData from "../../hooks/useFetchData";

import { WishlistModalItemTemplate } from "./WishlistModalItemTemplate";

interface EditWishlistModalItemProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    quantity: number;
    price: number;
  };
  localRemoveWishlistItem: (id: number) => void;
  setIsWishlistEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditWishlistModalItem({
  boardgame,
  localRemoveWishlistItem,
  setIsWishlistEdited
}: EditWishlistModalItemProps) {
  const imageType: any = "arraybuffer";

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: imageType,
  };

  const [{ data: imageData, loading, error }] = useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });
  

  return (
    <WishlistModalItemTemplate
      boardgame={boardgame}
      blobImage={blobImage}
      localRemoveWishlistItem={localRemoveWishlistItem}
    />
  );
}
