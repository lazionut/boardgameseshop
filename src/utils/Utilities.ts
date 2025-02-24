import { Constants, ORDER_STATUS_OPTIONS } from "src/constants/Constants";
import { CountryType } from "src/constants/Countries";
import i18n from "src/localization/i18n";

export function stockDefiner(stockQuantity: number): string | undefined {
  if (stockQuantity > Constants.IN_STOCK) {
    return `${i18n.t("in-stock")}`;
  } else if (stockQuantity <= Constants.IN_STOCK && stockQuantity > 1) {
    return `${i18n.t("limited-stock")}`;
  } else if (stockQuantity === 1) {
    return `${i18n.t("last-unit")}`;
  } else if (stockQuantity === 0) {
    return `${i18n.t("out-of-stock")}`;
  }
}

export function orderStatusDefiner(orderStatus: number): string | undefined {
  switch (orderStatus) {
    case 0:
      return ORDER_STATUS_OPTIONS[0].label;
    case 1:
      return ORDER_STATUS_OPTIONS[1].label;
    case 2:
      return ORDER_STATUS_OPTIONS[2].label;
    case 3:
      return ORDER_STATUS_OPTIONS[3].label;
    case 4:
      return ORDER_STATUS_OPTIONS[4].label;
  }
}

export function sortOrderDefiner(sortOrder: number): string | undefined {
  switch (sortOrder) {
    case 0:
      return `${i18n.t("release-year")} ↓`;
    case 1:
      return `${i18n.t("price")} ↑`;
    case 2:
      return `${i18n.t("price")} ↓`;
    case 3:
      return `${i18n.t("name")}  ↑`;
    case 4:
      return `${i18n.t("name")}  ↓`;
  }
}

export function getCurrentCountryCode(
  countries: readonly CountryType[],
  shownCountry: string
): string {
  const labelIndex = countries.findIndex(
    (country: CountryType) => country.label === shownCountry
  );

  return countries[labelIndex].code;
}

export function trimDateTime(inputDateTime: string): string {
  const cleaneadDate: string = inputDateTime.substring(0, 10);
  const correctFormattedDate: string = cleaneadDate
    .split("-")
    .reverse()
    .join("-");

  const cleaneadTime: string = inputDateTime.substring(11, 19);

  return correctFormattedDate + " " + cleaneadTime;
}
