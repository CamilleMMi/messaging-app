const dotenv = require('dotenv');

dotenv.config({ path: './src/env/.env' });

const { NODE_ENV, MONGODB_URL, PORT, JWT_KEY, CORS_ORIGIN } = process.env

module.exports = {
    env: NODE_ENV,
    mongodb_url: MONGODB_URL,
    port: PORT,
    jwt_key: JWT_KEY,
    cors_origin: CORS_ORIGIN
};