import { BASE_URL, ENDPOINT_AUTH_REFRESH } from "@/constants/constants";
import axios from "axios";

// --- PUBLIC INSTANCE ---
// Use this for fetching "Works", "Tools", etc., for regular visitors.
export const publicApi = axios.create({
  baseURL: BASE_URL,
});

// --- ADMIN (PRIVATE) INSTANCE ---
// Use this for the Dashboard.
export const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Attach the Interceptor ONLY to the Admin instance
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const expiredToken = localStorage.getItem("access_token");
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      expiredToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Refresh call using the HttpOnly cookie
        const res = await axios.post(
          `${BASE_URL}${ENDPOINT_AUTH_REFRESH}`,
          { expiredToken },
          { withCredentials: true },
        );

        const accessToken = res.data.data.token;
        localStorage.setItem("access_token", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return adminApi(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
