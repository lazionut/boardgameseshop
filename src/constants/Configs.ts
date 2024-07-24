import { ResponseType } from "axios";

export const Configs: { [key: string]: string | number } = {
  BASE_URL: "https://localhost:7107/api",
  REQUEST_TIMEOUT: 15000,
  ALERT_TIMEOUT: 3000,
  OK_RESPONSE: 200,
  NO_CONTENT_RESPONSE: 204,
  NOT_FOUND_RESPONSE: 404,
};

export const IMAGE_TYPE: ResponseType = "arraybuffer";