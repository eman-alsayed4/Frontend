import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    /**
     * if token exists then we add the token to request header
     */
    config.headers["x-auth-token"] = token;
  }
  return config;
});