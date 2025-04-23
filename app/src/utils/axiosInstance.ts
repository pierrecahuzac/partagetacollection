import axios from "axios";

const protocol = import.meta.env.VITE_API_PROTOCOL;
const domain = import.meta.env.VITE_API_DOMAIN;
const port = import.meta.env.VITE_API_PORT;

const axiosInstance = axios.create({
  baseURL: `${protocol}://${domain}:${port}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
