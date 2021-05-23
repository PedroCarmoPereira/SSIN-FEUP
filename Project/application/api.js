require("dotenv").config();

const axios = require('axios');
const api = axios.create({baseURL: process.env.SERVER_URL});

const getStories = async () => {
	await api.get('/api/stories')
		.then(async (response) => {
			if (response.status == 200) console.log(response.data.data);
		}).catch((err) => {
			if (err) console.log("Network Error.");
		});
};

module.exports = { api, getStories }