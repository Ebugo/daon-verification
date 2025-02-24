/* eslint-disable no-param-reassign */
import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_ALT_BASE_URL
      : process.env.REACT_APP_BASE_URL,
  timeout: 1 * 60 * 1000,
});

// Add a request interceptor
apiRequest.interceptors.request.use(
  async (config) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return config;

    if (userToken) {
      config.headers.Authorization = "Bearer";
      config.headers["alat-token"] = userToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiRequest.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401 && window.location.pathname !== "/") {
    localStorage.clear();
    window.location.replace("/");
  }
  return Promise.reject(error);
});

export default apiRequest;
