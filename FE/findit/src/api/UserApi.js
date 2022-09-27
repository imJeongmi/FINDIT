import axios from "axios";

import ls from "../helper/LocalStorage";

// configuration
const UserApi = axios.create({
  baseURL: "https://j7a203.p.ssafy.io/",
  headers: {
    "Content-Type": "application/json",
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
