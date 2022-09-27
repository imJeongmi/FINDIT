import axios from "axios";

import ls from "../helper/LocalStorage";

// configuration
const UserApi = axios.create({
  baseURL: "https://findit.life/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "Host": "findit.life:8399"

  },
});

UserApi.interceptors.request.use(
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
