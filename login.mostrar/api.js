import axios from "axios";
import { getToken } from "./auth";

const isProd = process.env.NODE_ENV === "production";

const apiUrl = isProd
  ? "https://app.baitadesign.com.br/api-dmachine"
  : "http://127.0.0.1:3399/";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
