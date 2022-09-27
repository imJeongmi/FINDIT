import axios from "axios";

import ls from "../helper/LocalStorage";

axios.defaults.withCredentials = true
// configuration
const UserApi = axios.create({
  baseURL: "https://j7a203.p.ssafy.io/api/v1/",
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
