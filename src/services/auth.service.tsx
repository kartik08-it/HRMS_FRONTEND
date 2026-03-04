import { ENDPOINTS } from "../api/endpoint";
import { http } from "../api/http";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  message?: string;
};

export const authService = {
  login: (payload: LoginPayload) =>
    http.post<LoginResponse, LoginPayload>(ENDPOINTS.LOGIN, payload),
};

