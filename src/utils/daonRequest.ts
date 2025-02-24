/* eslint-disable no-param-reassign */
import axios from "axios";

const daonRequest = axios.create({
  baseURL: process.env.REACT_APP_DIMEC_BASE_URL,
  timeout: 1 * 60 * 1000,
});

// Add a request interceptor
daonRequest.interceptors.request.use(
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

daonRequest.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401 && window.location.pathname !== "/") {
    localStorage.clear();
    window.location.replace("/");
  }
  return Promise.reject(error);
});

export default daonRequest;
