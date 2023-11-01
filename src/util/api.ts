import axios from "axios";
import { defaultTo } from "lodash-es";
import { config } from "../config";

export const enableMsw =
  !config.useExternalApi &&
  (process.env.NODE_ENV === "development" || config.alwaysUseMsw);

/** Axios instance with baseURL set up correctly */
export const apiAxios = axios.create({
  baseURL: enableMsw ? process.env.PUBLIC_URL : config.externalApiOrigin
});

/** Extract error message from axios error */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(err: any) {
  if (err && err.response) {
    return defaultTo(
      err.response.data,
      defaultTo(err.response.statusText, err.response.status)
    );
  } else {
    return "No response from server";
  }
}
