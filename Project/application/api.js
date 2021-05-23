require("dotenv").config();

const axios = require('axios');
const api = axios.create({baseURL: process.env.SERVER_URL});

module.exports = { api }