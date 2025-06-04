import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
