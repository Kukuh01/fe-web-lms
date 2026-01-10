import { loginAPI } from "../api/auth.api";
import {
  setAccessToken,
  removeAccessToken,
  decodeAccessToken,
} from "./token.service";

export const login = async (username: string, password: string) => {
  const response = await loginAPI(username, password);
  setAccessToken(response.data.access);
  return decodeAccessToken();
};

let isLoggingOut = false;

export const setLoggingOut = (value: boolean) => {
  isLoggingOut = value;
};

export const isCurrentlyLoggingOut = () => isLoggingOut;

export const logout = () => {
  setLoggingOut(true);
  removeAccessToken();
  window.location.href = "/";
};

export const getCurrentUser = () => {
  return decodeAccessToken();
};
