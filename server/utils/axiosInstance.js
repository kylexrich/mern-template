const axios = require('axios');

const externalApi = axios.create({
  baseURL: 'https://api.example.com',
});

module.exports = externalApi;
