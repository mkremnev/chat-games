import axios from 'axios';

axios.defaults.baseURL = 'https://api-23eqo.ondigitalocean.app';
axios.defaults.headers.get['Content-type'] = 'application-json';

export const request = async (num = 0) => {
	try {
		return await axios
			.get(`/api/messages?skip=${num}&limit=15 `)
			.then((response) => {
				return response.data;
			});
	} catch (error) {
		console.error(error);
	}
};
