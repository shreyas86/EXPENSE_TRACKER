import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // ✅ fixed capitalization
    Accept: "application/json",
  },
});

// ✅ Request Interceptor (Attach token)
axiosinstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // ✅ fixed: should be `Promise`, not `promise`
  }
);

// ✅ Response Interceptor (Handle errors globally)
axiosinstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error, try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout, try again later");
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;
