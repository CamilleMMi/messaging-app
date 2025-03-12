const dotenv = require('dotenv');

dotenv.config({ path: './src/env/.env' });

const { BACKEND_URL } = process.env

module.exports = {
    backend_url : BACKEND_URL,
};