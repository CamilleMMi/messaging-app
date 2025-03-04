const dotenv = require('dotenv');

dotenv.config({ path: './src/env/.env' });

const { NODE_ENV, MONGODB_URI, PORT, JWT_KEY } = process.env

module.exports = {
    env: NODE_ENV,
    mongodb_uri: MONGODB_URI,
    port: PORT,
    jwt_key: JWT_KEY
};