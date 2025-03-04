const envConfiguration = require('../configurations/env.configuration-1.0.0');

const { env } = envConfiguration;

const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json({ message: err.message, stack: env === "development" ? err.stack : null});
};

module.exports = errorMiddleware;