import { jwtDecode } from "jwt-decode";

export type JWTPayload = {
  user_id: number;
  username: string;
  role: "admin" | "dosen" | "mahasiswa";
  exp: number;
};

const TOKEN_KEY = "access_token";

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeAccessToken = (): JWTPayload | null => {
  const token = getAccessToken();
  if (!token) return null;
  return jwtDecode<JWTPayload>(token);
};

export const isTokenExpired = (): boolean => {
  const payload = decodeAccessToken();
  if (!payload) return true;
  return payload.exp * 1000 < Date.now();
};
