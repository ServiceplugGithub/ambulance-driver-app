import { BASE_URL } from "@/constants/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export default axiosInstance;
