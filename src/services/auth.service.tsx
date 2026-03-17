import { ENDPOINTS } from "../api/endpoint";
import { http } from "../api/http";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: any;
  token?: string;
  message?: string;
};

export const authService = {
  login: (payload: LoginPayload) =>
    http.post<LoginResponse, LoginPayload>(ENDPOINTS.LOGIN, payload),

  logout: () =>
    http.post<{ message: string }, null>(ENDPOINTS.LOGOUT, null),


};
