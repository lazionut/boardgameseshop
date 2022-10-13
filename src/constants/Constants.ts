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
  { label: "Created", value: 0 },
  { label: "Processing", value: 1 },
  { label: "Shipping", value: 2 },
  { label: "Completed", value: 3 },
  { label: "Cancelled", value: 4 },
];
