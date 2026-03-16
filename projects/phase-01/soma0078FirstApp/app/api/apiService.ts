import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};
export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
  headers: defaultHeaders,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
