import axios from "axios";

import storage from "../helper/storage";

// configuration
const UserApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const token = storage.get("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default UserApi;
