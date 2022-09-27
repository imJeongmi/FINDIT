import axios from "axios";

import ss from "../helper/SessionStorage";

// configuration
const PlayerApi = axios.create({
	// baseURL: "https://j7a203.p.ssafy.io/api/v1/",
	baseURL: "http://localhost:8399/api/v1/",
	headers: {
		"Content-Type": "application/json",
	},
});

PlayerApi.interceptors.request.use(
	config => {
		const token = ss.get("token");
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export default PlayerApi;