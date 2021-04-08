const axios = require('axios');
require('dotenv').config();

const elasticsearch = axios.create({
  baseURL: process.env.ELASTICSEARCH_URL,
});

module.exports = elasticsearch;
