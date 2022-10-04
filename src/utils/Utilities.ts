import { Constants } from "../constants/Constants";
import { CountryType } from "../constants/Countries";

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

export function orderStatusDefiner(orderStatus: number): string | undefined {
  switch (orderStatus) {
    case 0:
      return "Created";
    case 1:
      return "Processing";
    case 2:
      return "Shipping";
    case 3:
      return "Completed";
    case 4:
      return "Cancelled";
  }
}

export function sortOrderDefiner(sortOrder: number): string | undefined {
  switch (sortOrder) {
    case 0:
      return "Release Year ↓";
    case 1:
      return "Price ↑";
    case 2:
      return "Price ↓";
    case 3:
      return "Name ↑";
    case 4:
      return "Name ↓";
  }
}

export function getCurrentCountryCode(
  countries: readonly CountryType[],
  shownCountry: string
): string {
  const labelIndex = countries.findIndex(
    (country: CountryType) => country.label == shownCountry
  );

  return countries[labelIndex].code;
}
