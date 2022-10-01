import axios from "axios";

import ss from "../helper/SessionStorage";

// configuration
const PlayerApi = axios.create({
  // baseURL: "https://findit.life/api/v1/",
  baseURL: "http://localhost:8399/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

PlayerApi.interceptors.request.use(
  config => {
    const playeraccessToken = ss.get("playeraccessToken");
    if (playeraccessToken) {
      config.headers["Authorization"] = "Bearer " + playeraccessToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default PlayerApi;
