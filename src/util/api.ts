import axios from "axios";
import { config } from "../config";

export const enableMsw =
  !config.useExternalApi &&
  (process.env.NODE_ENV === "development" || config.alwaysUseMsw);

/** Axios instance with baseURL set up correctly */
export const apiAxios = axios.create({
  baseURL: enableMsw ? process.env.PUBLIC_URL : config.externalApiOrigin
});
