import i18n from "../localization/i18n";

export const Constants: { [key: string]: any } = {
  DEFAULT_PAGE_INDEX: 1,
  DEFAULT_SORT_ORDER: 0,
  DEFAULT_PAGE_SIZE: 8,
  IN_STOCK: 30,
  ADMIN: "Admin",
};

export const ConstantsArrays: { [key: string]: number[] } = {
  PAGE_SIZES: [8, 16, 32],
  SORT_OPTIONS: [0, 1, 2, 3, 4],
};

export const ORDER_STATUS_OPTIONS: { [key: string]: any } = [
  { label: `${i18n.t("created-status")}`, value: 0 },
  { label: `${i18n.t("processing-status")}`, value: 1 },
  { label: `${i18n.t("shipping-status")}`, value: 2 },
  { label: `${i18n.t("completed-status")}`, value: 3 },
  { label: `${i18n.t("cancelled-status")}`, value: 4 },
];
