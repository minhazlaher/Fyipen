import axios from 'axios';
import { store } from '../redux/Store';
import { ApiConstants, BASE_URL } from './ApiConstants';

export const axiosClient = axios.create({
	baseURL: BASE_URL,
});

const blacklistUrls = [
	ApiConstants.SEND_OR_VERIFY_OTP
];

axiosClient.interceptors.request.use(async (config) => {
	try {
		const token = store.getState().AuthReducer.token;
		if (token && !blacklistUrls.includes(config.url)) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		};

		if (config.method === "post" || config.method === "put") {
			config.headers = {
				...config.headers,
				'Content-Type': 'application/json'
			};
		};
	} catch (e) {
		console.error({ e });
	};
	return config;
});
