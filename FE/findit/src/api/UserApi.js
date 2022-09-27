import axios from "axios";

import ls from "../helper/LocalStorage";

// configuration
const UserApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const token = ls.get("token");
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
