import axios from "axios";
import { LocalStorage } from "@/utils";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrive user token from local storage
    const token = LocalStorage.get("token");

    // Set Authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// API functions for different actions

/**
 * @param {Object} data - Login data
 * @param {string} data.username - Username
 * @param {string} data.password - Password
 * @param {string} data.email - Email
 */
const loginUser = (data) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.post("/users/logout");
};

export { loginUser, registerUser, logoutUser };
