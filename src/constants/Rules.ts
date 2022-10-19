export const requiredFieldRule: {
  [key: string]: { [key: string]: boolean | string };
} = {
  required: {
    value: true,
    message: "Field is required",
  },
};

export const phoneFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    message: "Phone number is not correct",
  },
};

export const emailFieldRule: {
  [key: string]: { [key: string]: RegExp | string };
} = {
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Must be longer than 2 characters and in a valid email format",
  },
};

export const PASSWORD_MESSAGE: string =
  "Minimum six characters, at least one uppercase letter, one lowercase letter, one digit and one special character";

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
    message: "Please enter a valid positive number higher than 0",
  },
};

export const minimumPriceFieldRule: {
  [key: string]: { [key: string]: number | string };
} = {
  min: {
    value: 0.5,
    message: "Minimum price must be 0.5",
  },
};
