import { Constants } from "../constants/Constants";

export function stockDefiner(stockQuantity: number): string | undefined {
  if (stockQuantity > Constants.IN_STOCK) {
    return "In stock";
  } else if (stockQuantity <= Constants.IN_STOCK && stockQuantity > 1) {
    return "Limited stock";
  } else if (stockQuantity === 1) {
    return "Last unit";
  } else if (stockQuantity === 0) {
    return "Out of stock";
  }
}
