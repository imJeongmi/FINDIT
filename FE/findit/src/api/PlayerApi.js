import axios from "axios";

import ss from "../helper/SessionStorage";

// configuration
const PlayerApi = axios.create({
	baseURL: "",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
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