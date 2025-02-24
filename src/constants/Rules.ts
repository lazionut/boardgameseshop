import i18n from "src/localization/i18n";

export const requiredFieldRule: {
  [key: string]: { [key: string]: boolean | string };
} = {
  required: {
    value: true,
    message: `${i18n.t("required-message")}`,
  },
};

export const phoneFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    message: `${i18n.t("phone-format-message")}`,
  },
};

export const emailFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: `${i18n.t("email-format-message")}`,
  },
};

export const PASSWORD_MESSAGE: string = `${i18n.t("password-rule")}`;

export const passwordFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    message: PASSWORD_MESSAGE,
  },
};

export const positiveNumberFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^(0|[1-9][0-9]*)$/,
    message: `${i18n.t("positive-number-message")}`,
  },
};

export const minimumPriceFieldRule: {
  [key: string]: { [key: string]: number | string };
} = {
  min: {
    value: 0.5,
    message: `${i18n.t("minimum-price-message")}`
  },
};
