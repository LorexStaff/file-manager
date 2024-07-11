import axios from "axios";
import { API_URL } from "../api/config";

interface AuthResponse {
  token: string;
}

const api = axios.create({ baseURL: API_URL });

export const register = async (login: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/register", {
    login,
    password,
  });
  return response.data.token;
};

export const login = async (login: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/login", {
    login,
    password,
  });
  return response.data.token;
};
