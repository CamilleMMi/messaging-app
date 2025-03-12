const envConfiguration = require('./env.configuration-1.0.0');
const axios = require('axios');

const { api_url } = envConfiguration;

const apiClient = axios.create({
    baseURL: api_url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});