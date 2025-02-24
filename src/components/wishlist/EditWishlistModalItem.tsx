import { WishlistModalItemTemplate } from "src/components/wishlist/WishlistModalItemTemplate";
import { IMAGE_TYPE } from "src/constants/Configs";
import useFetchData from "src/hooks/useFetchData";

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
}

export function EditWishlistModalItem({
  boardgame,
  localRemoveWishlistItem,
}: EditWishlistModalItemProps) {
  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: IMAGE_TYPE,
  };

  const [{ data: imageData, loading, error }] =
    useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  return (
    <WishlistModalItemTemplate
      boardgame={boardgame}
      blobImage={blobImage}
      localRemoveWishlistItem={localRemoveWishlistItem}
    />
  );
}
