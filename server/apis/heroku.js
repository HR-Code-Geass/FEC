const axios = require('axios');

const BASE_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';
const CONFIG = { headers: { Authorization: process.env.GIT_TOKEN } };

module.exports = axios.create({
  baseURL: BASE_URL,
  headers: CONFIG.headers,
});
